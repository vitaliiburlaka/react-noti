import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    svgr(),
    react(),
    dts({
      include: ['src'],
      exclude: ['**/*.test.{ts,tsx}', '**/__mocks__/**', 'src/setupTests.ts'],
      compilerOptions: { rootDir: 'src' },
      // Emit declarations for every consumer resolution mode:
      // .d.ts for legacy (node10), .d.mts for ESM, .d.cts for CJS.
      outDirs: [
        { dir: 'dist' },
        { dir: 'dist', moduleFormat: 'esm' },
        { dir: 'dist', moduleFormat: 'cjs' },
      ],
      // Roll the declarations up into one self-contained file per format so
      // there are no extensionless relative imports for node16 ESM to choke on.
      bundleTypes: true,
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: 'ReactNoti',
      formats: ['es', 'cjs'],
      fileName: (format) =>
        format === 'es' ? 'react-noti.mjs' : 'react-noti.cjs',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@emotion/react',
        '@emotion/styled',
        '@emotion/styled/base',
      ],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'React',
          'react-dom': 'ReactDOM',
          '@emotion/react': 'emotionReact',
          '@emotion/styled': 'emotionStyled',
        },
      },
    },
  },
})
