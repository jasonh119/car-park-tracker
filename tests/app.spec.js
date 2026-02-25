// @ts-check
const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:8788';

// Clear localStorage between tests so each starts clean
test.beforeEach(async ({ page }) => {
    await page.goto(BASE);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
});

// ── 1. Page structure ─────────────────────────────────────────────────────────

test('page has correct title and heading', async ({ page }) => {
    await expect(page).toHaveTitle('Car Park Tracker');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Car Park Tracker');
});

test('manifest is linked in <head>', async ({ page }) => {
    const link = page.locator('link[rel="manifest"]');
    await expect(link).toHaveAttribute('href', 'manifest.json');
});

test('manifest.json is accessible and valid', async ({ page }) => {
    const response = await page.request.get(`${BASE}/manifest.json`);
    expect(response.status()).toBe(200);

    const manifest = await response.json();
    expect(manifest.name).toBe('Car Park Tracker');
    expect(manifest.short_name).toBeTruthy();
    expect(manifest.display).toBe('standalone');
    expect(manifest.start_url).toBeTruthy();
    expect(manifest.icons).toBeInstanceOf(Array);
    expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
    expect(manifest.theme_color).toBeTruthy();
    expect(manifest.background_color).toBeTruthy();
});

test('sw.js is accessible', async ({ page }) => {
    const response = await page.request.get(`${BASE}/sw.js`);
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain('install');
    expect(text).toContain('activate');
    expect(text).toContain('fetch');
});

test('app icons are accessible', async ({ page }) => {
    for (const icon of ['icon-192.png', 'icon-512.png']) {
        const response = await page.request.get(`${BASE}/${icon}`);
        expect(response.status(), `${icon} should return 200`).toBe(200);
        const contentType = response.headers()['content-type'];
        expect(contentType, `${icon} should be PNG`).toContain('image/png');
    }
});

// ── 2. Initial state ──────────────────────────────────────────────────────────

test('shows empty state when no data saved', async ({ page }) => {
    await expect(page.locator('.no-location')).toBeVisible();
    await expect(page.locator('.no-location')).toContainText('No parking location saved yet');
    await expect(page.locator('.no-history')).toContainText('No parking history yet');
});

test('save button is disabled on load', async ({ page }) => {
    await expect(page.locator('#saveButton')).toBeDisabled();
});

// ── 3. Form validation ────────────────────────────────────────────────────────

test('save button enables only when both fields filled', async ({ page }) => {
    const building = page.locator('#building');
    const level = page.locator('#level');
    const btn = page.locator('#saveButton');

    await building.fill('Block A');
    await expect(btn).toBeDisabled();

    await level.fill('L3');
    await expect(btn).toBeEnabled();

    await building.fill('');
    await expect(btn).toBeDisabled();
});

test('shows validation messages when fields are empty on partial fill', async ({ page }) => {
    // Type and then clear building — error should appear
    await page.locator('#building').fill('x');
    await page.locator('#building').fill('');
    await page.locator('#level').fill('L3');
    await expect(page.locator('#buildingError')).toBeVisible();
});

// ── 4. Saving a location ──────────────────────────────────────────────────────

test('saves location and displays it prominently', async ({ page }) => {
    await page.locator('#building').fill('Suntec City');
    await page.locator('#level').fill('B2');
    await page.locator('#saveButton').click();

    await expect(page.locator('.current-location')).toBeVisible();
    await expect(page.locator('.location-details')).toContainText('Suntec City');
    await expect(page.locator('.location-details')).toContainText('B2');
});

test('clears the form after saving', async ({ page }) => {
    await page.locator('#building').fill('Marina Square');
    await page.locator('#level').fill('L4');
    await page.locator('#saveButton').click();

    await expect(page.locator('#building')).toHaveValue('');
    await expect(page.locator('#level')).toHaveValue('');
    await expect(page.locator('#saveButton')).toBeDisabled();
});

test('saved location appears in history', async ({ page }) => {
    await page.locator('#building').fill('VivoCity');
    await page.locator('#level').fill('P4');
    await page.locator('#saveButton').click();

    const historyItems = page.locator('.history-item');
    await expect(historyItems).toHaveCount(1);
    await expect(historyItems.first()).toContainText('VivoCity');
    await expect(historyItems.first()).toContainText('P4');
});

// ── 5. Multiple saves ─────────────────────────────────────────────────────────

test('second save becomes the current location', async ({ page }) => {
    await page.locator('#building').fill('Plaza A');
    await page.locator('#level').fill('L1');
    await page.locator('#saveButton').click();

    await page.locator('#building').fill('Towers B');
    await page.locator('#level').fill('B3');
    await page.locator('#saveButton').click();

    await expect(page.locator('.location-details')).toContainText('Towers B');
    await expect(page.locator('.location-details')).toContainText('B3');
});

test('history shows all saves sorted newest first', async ({ page }) => {
    const entries = [
        { building: 'Alpha', level: 'L1' },
        { building: 'Beta', level: 'L2' },
        { building: 'Gamma', level: 'L3' },
    ];

    for (const e of entries) {
        await page.locator('#building').fill(e.building);
        await page.locator('#level').fill(e.level);
        await page.locator('#saveButton').click();
    }

    const items = page.locator('.history-item .location');
    await expect(items).toHaveCount(3);
    // Newest first: Gamma, Beta, Alpha
    await expect(items.nth(0)).toContainText('Gamma');
    await expect(items.nth(1)).toContainText('Beta');
    await expect(items.nth(2)).toContainText('Alpha');
});

// ── 6. localStorage persistence ───────────────────────────────────────────────

test('data persists across page reloads', async ({ page }) => {
    await page.locator('#building').fill('Persistent Tower');
    await page.locator('#level').fill('PL9');
    await page.locator('#saveButton').click();

    await page.reload();

    await expect(page.locator('.location-details')).toContainText('Persistent Tower');
    await expect(page.locator('.location-details')).toContainText('PL9');
    await expect(page.locator('.history-item')).toHaveCount(1);
});

test('data stored in localStorage with correct shape', async ({ page }) => {
    await page.locator('#building').fill('Data Check');
    await page.locator('#level').fill('DC1');
    await page.locator('#saveButton').click();

    const records = await page.evaluate(() => {
        return JSON.parse(localStorage.getItem('carParkRecords') || '[]');
    });

    expect(records).toHaveLength(1);
    expect(records[0].building).toBe('Data Check');
    expect(records[0].level).toBe('DC1');
    expect(records[0].id).toBeTruthy();
    expect(records[0].timestamp).toBeTruthy();
    expect(() => new Date(records[0].timestamp)).not.toThrow();
});
