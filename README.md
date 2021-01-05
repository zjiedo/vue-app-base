## vue-app-base
#### 公共能力

1. 输入输出
   1. 入口文件
   2. 输出
      1. 路径
      2. 输出文件名
   
2. 代码编译
   1. Vue文件编译: `vue-loader`/`vue-template-compiler`, `VueLoaderPlugin`
   2. JavaScript新特性语法编译: `babel-loader`/`@babel/core`/`@babel/preset-env`
   3. Less语法编译: `less-loader`
   4. css代码处理: `css-loader` `style-loader`
   
3. 根据模板HTML文件生成页面: `html-webpack-plugin`

   1. 渲染模板变量

4. 代码风格检测

   1. 使用`standard`风格 `eslint-loader`/`eslint-plugin-standard`

5. 资源加载
   1. 处理静态资源文件（图片、字体），对小文件编码成Base64:`url-loader`/`file-loader`
   2. 对字体文件，直接用`file-loader`转运到输出目录
   3. 拷贝公共路径文件: `copy-webpack-plugin`

6. 配置合并: `webpack-merge-plugin`

7. 全局变量注入：`webpack.DefinePlugin`

8. 全局路径别名: `resolve/alias`

9. 公共模块拆分: `splitChunks: 'all'`, 这里以Vue-Router动态路由为例

   1. ```
      component: () => import(/* webpackChunkName: "routes" */('@/components/OtherPage.vue'))
      ```

10. Webpack配置类型提示: `/** @type {import('webpack').Configuration} */`

#### 开发环境

1. 模式指定为 `development`
2. 代码本地实时调试
   1. 启动本地服务器: `webpack-dev-server`
   2. 编译结果、错误输出在页面
   3. 样式、图片的HMR模块热替换: `webpack.HotModuleReplacementPlugin`， 未做js相关的热替换
3. 样式内联
   1. 样式写进html style: `style-loader`
4. 生成`cheap-module-eval-source-map`便于调试
5. 代码打包构建优化
   1. 输出文件名，带contenthash, 防止缓存

#### 生产环境

1. 模式指定为`production`

2. 生产环境下的优化配置

   1. Tree Shaking

      1. usedExports: true
      2. minimize: true

   2. Code Splitting
      1. 公共模块提取

      2. 特定模块的拆分 `splitChunks: 'all'`

      3. 路由懒加载 `vue-router + import + 魔法注释`

      4. 使用`cacheGroups`自定义项目chunk拆分逻辑（这里以引入elementUI为例）

         1. ```
            cacheGroups: {
                    libs: {
                      name: 'chunk-libs',
                      test: /[\\/]node_modules[\\/]/,
                      priority: 10,
                      chunks: 'initial'
                    },
                    elementUI: {
                      name: 'chunk-elementui',
                      test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
                      priority: 20
                    },
                    commons: {
                      name: 'chunks-common',
                      test: path.join(__dirname, 'src/components'),
                      priority: 5,
                      reuseExistingChunk: true
                    }
                  }
            ```

   3. Name Hash: 通过webpack占位符, 对文件类型做归类，且加上8位`contenthash`

3. CSS文件
   1. 代码压缩
   2. 样式单独提取到CSS文件中 `MiniCssExtractPlugin`

4. JS文件

   1. 代码压缩

5. SourceMap保护源代码：`devtool: 'none'`

6. 打包目录自动清除: `clean-webpack-plugin`

