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
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ReactNoti',
      formats: ['es', 'cjs'],
      fileName: (format) =>
        format === 'es' ? 'react-noti.esm.js' : 'react-noti.cjs.js',
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
