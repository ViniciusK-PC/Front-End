import { test, expect } from '@playwright/test';

/**
 * Testes E2E para operações CRUD de clientes
 */
test.describe('Gerenciamento de Clientes', () => {

    test.beforeEach(async ({ page }) => {
        // Fazer login antes de cada teste
        await page.goto('/login');
        await page.getByLabel(/email/i).fill('Mauricio@oficina.com');
        await page.getByLabel(/senha/i).fill('admin123');
        await page.getByRole('button', { name: /entrar/i }).click();

        // Aguardar redirecionamento
        await expect(page).toHaveURL(/dashboard/);

        // Navegar para a página de clientes
        await page.getByRole('link', { name: /clientes/i }).click();
        await expect(page).toHaveURL(/clientes/);
    });

    test('deve exibir lista de clientes', async ({ page }) => {
        // Verificar que a tabela de clientes está visível
        await expect(page.getByRole('table')).toBeVisible();

        // Verificar cabeçalhos da tabela
        await expect(page.getByRole('columnheader', { name: /nome/i })).toBeVisible();
        await expect(page.getByRole('columnheader', { name: /email/i })).toBeVisible();
        await expect(page.getByRole('columnheader', { name: /telefone/i })).toBeVisible();
    });

    test('deve criar novo cliente com sucesso', async ({ page }) => {
        // Clicar no botão de novo cliente
        await page.getByRole('button', { name: /novo cliente/i }).click();

        // Preencher formulário
        const timestamp = Date.now();
        await page.getByLabel(/nome/i).fill('Cliente Teste E2E');
        await page.getByLabel(/cpf\/cnpj/i).fill('12345678901');
        await page.getByLabel(/email/i).fill(`cliente.e2e.${timestamp}@teste.com`);
        await page.getByLabel(/telefone/i).fill('11987654321');
        await page.getByLabel(/endereço/i).fill('Rua Teste, 123');
        await page.getByLabel(/cidade/i).fill('São Paulo');
        await page.getByLabel(/estado/i).fill('SP');
        await page.getByLabel(/cep/i).fill('01234-567');

        // Salvar cliente
        await page.getByRole('button', { name: /salvar/i }).click();

        // Verificar mensagem de sucesso
        await expect(page.getByText(/cliente criado com sucesso/i)).toBeVisible();

        // Verificar que o cliente aparece na lista
        await expect(page.getByText('Cliente Teste E2E')).toBeVisible();
    });

    test('deve editar cliente existente', async ({ page }) => {
        // Clicar no primeiro botão de editar
        await page.getByRole('button', { name: /editar/i }).first().click();

        // Modificar nome
        const nomeInput = page.getByLabel(/nome/i);
        await nomeInput.clear();
        await nomeInput.fill('Cliente Editado E2E');

        // Salvar alterações
        await page.getByRole('button', { name: /salvar/i }).click();

        // Verificar mensagem de sucesso
        await expect(page.getByText(/cliente atualizado com sucesso/i)).toBeVisible();

        // Verificar que o nome foi atualizado
        await expect(page.getByText('Cliente Editado E2E')).toBeVisible();
    });

    test('deve buscar cliente por nome', async ({ page }) => {
        // Digitar no campo de busca
        await page.getByPlaceholder(/buscar/i).fill('Cliente');

        // Verificar que os resultados foram filtrados
        const rows = page.getByRole('row');
        await expect(rows).not.toHaveCount(0);
    });

    test('deve visualizar detalhes do cliente', async ({ page }) => {
        // Clicar no primeiro cliente da lista
        await page.getByRole('button', { name: /visualizar/i }).first().click();

        // Verificar que os detalhes estão visíveis
        await expect(page.getByText(/detalhes do cliente/i)).toBeVisible();
        await expect(page.getByText(/nome:/i)).toBeVisible();
        await expect(page.getByText(/email:/i)).toBeVisible();
        await expect(page.getByText(/telefone:/i)).toBeVisible();
    });

    test('deve deletar cliente com confirmação', async ({ page }) => {
        // Configurar listener para dialog de confirmação
        page.on('dialog', dialog => dialog.accept());

        // Clicar no botão de deletar
        await page.getByRole('button', { name: /deletar/i }).first().click();

        // Verificar mensagem de sucesso
        await expect(page.getByText(/cliente deletado com sucesso/i)).toBeVisible();
    });

    test('deve validar campos obrigatórios ao criar cliente', async ({ page }) => {
        // Clicar no botão de novo cliente
        await page.getByRole('button', { name: /novo cliente/i }).click();

        // Tentar salvar sem preencher campos
        await page.getByRole('button', { name: /salvar/i }).click();

        // Verificar mensagens de validação
        await expect(page.getByText(/nome é obrigatório/i)).toBeVisible();
        await expect(page.getByText(/email é obrigatório/i)).toBeVisible();
    });

    test('deve cancelar criação de cliente', async ({ page }) => {
        // Clicar no botão de novo cliente
        await page.getByRole('button', { name: /novo cliente/i }).click();

        // Preencher alguns campos
        await page.getByLabel(/nome/i).fill('Cliente Cancelado');

        // Clicar em cancelar
        await page.getByRole('button', { name: /cancelar/i }).click();

        // Verificar que voltou para a lista
        await expect(page.getByRole('table')).toBeVisible();

        // Verificar que o cliente não foi criado
        await expect(page.getByText('Cliente Cancelado')).not.toBeVisible();
    });
});
