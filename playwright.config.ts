import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração do Playwright para testes E2E
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './e2e',

    /* Tempo máximo de execução de um teste */
    timeout: 30 * 1000,

    /* Configuração de expect */
    expect: {
        timeout: 5000
    },

    /* Executar testes em paralelo */
    fullyParallel: true,

    /* Falhar o build no CI se você acidentalmente deixar test.only */
    forbidOnly: !!process.env.CI,

    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,

    /* Opt out of parallel tests on CI */
    workers: process.env.CI ? 1 : undefined,

    /* Reporter to use */
    reporter: [
        ['html'],
        ['list'],
        ['json', { outputFile: 'test-results/results.json' }]
    ],

    /* Configurações compartilhadas para todos os projetos */
    use: {
        /* URL base para usar em ações como `await page.goto('/')` */
        baseURL: 'http://localhost:4200',

        /* Coletar trace quando retry em falha */
        trace: 'on-first-retry',

        /* Screenshot on failure */
        screenshot: 'only-on-failure',

        /* Video on failure */
        video: 'retain-on-failure',
    },

    /* Configurar projetos para diferentes navegadores */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },

        /* Testes em dispositivos móveis */
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
        },
    ],

    /* Executar servidor de desenvolvimento antes de iniciar os testes */
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:4200',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },
});
