import { log } from "console";
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import { resolve } from "path";
export default defineConfig((env) => {
    log(env);
    return {
        plugins: [
            react(),
        ],
        resolve: {
            alias: {
                '@/': '/src/'
            }
        },
        server: {
            
        },
        build: {
            // target: ["es5"],
            outDir: "./dist",
            minify: "terser",
            rollupOptions: {
                input: resolve(__dirname, './src/view/main.tsx'),
                // external: ['react', "react-dom"],
                output: {
                    entryFileNames: 'assets/[name].js',
                    // 将第三方依赖库单独打包成一个文件
                    manualChunks: {
                        react: ['react', 'react-dom'],
                    }
                }
            }
        }
    };
});