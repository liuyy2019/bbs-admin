const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');
const path = require('path');
const fs = require('fs');

const options = {
    stylesDir: path.join(__dirname, "./src/styles"),
    antDir: path.join(__dirname, "./node_modules/antd"),
    varFile: path.join(__dirname, "./src/styles/vars.less"),
    mainLessFile: path.join(__dirname, "./src/styles/main.less"),
    themeVariables: [
        "@primary-color",
        "@secondary-color",
        "@text-color",
        "@text-color-secondary",
        "@heading-color",
        "@layout-body-background",
        "@btn-primary-bg",
        "@layout-header-background",
        "@border-color-base",
    ],
    generateOnce: true, // generate color.less on each compilation
};

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#1DA57A',
        },
    }),
    // customize-cra配置路径映射
    addWebpackAlias({
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
    })
);
