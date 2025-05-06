import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import js from '@eslint/js';
import jest from 'eslint-plugin-jest';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
	js.configs.recommended,
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: parserTs,
			parserOptions: {
				project: './tsconfig.json',
				sourceType: 'module',
			},
			globals: {
				// Definindo as variáveis globais do Node.js
				process: 'readonly',
				__dirname: 'readonly',
				module: 'readonly',
				global: 'readonly',
				require: 'readonly',
				exports: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': eslintPluginTs,
			prettier: prettierPlugin,
			'unused-imports': unusedImports,
		},
		rules: {
			...prettierConfig.rules,
			'prettier/prettier': ['error'],
			'unused-imports/no-unused-imports': 'error',
			'no-unused-vars': ['warn'],
			'@typescript-eslint/no-explicit-any': ['warn'],
			'@typescript-eslint/explicit-function-return-type': 'off',
			'no-console': 'warn',
			semi: ['error', 'always'],
			quotes: ['error', 'single'],
		},
	},
	{
		// Configurações específicas para testes
		files: ['**/*.spec.ts', '**/*.test.ts', '**/*.mock.ts'],
		plugins: {
			jest,
		},
		languageOptions: {
			globals: {
				describe: true,
				it: true,
				expect: true,
				beforeEach: true,
				beforeAll: true,
				afterEach: true,
				afterAll: true,
				jest: true,
			},
		},
		rules: {
			...jest.configs.recommended.rules,
		},
	},
];
