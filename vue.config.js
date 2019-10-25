const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
    // 基本路径
    baseUrl: "./",
    // 输出文件目录
    outputDir: "dist",
    // webpack-dev-server 相关配置
    productionSourceMap: false,
    lintOnSave: false,
    css: {//配置高于chainWebpack中关于css loader的配置
        // modules: true, // 是否开启支持‘foo.module.css’样式
        // extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入
        sourceMap: false,// 是否在构建样式地图，false将提高构建速度
		loaderOptions: {// css预设器配置项
			sass: {
				data: `@import "@/assets/comm/mixin.scss";`
			}
		}
	},
    devServer: {
        open: process.platform === 'darwin',
        // host: '127.0.0.1',
        port: 8890,
        https: false,
        hotOnly: false,
        proxy: {
            '/api/': {
                target:'http://47.106.155.169:8081',//"http://192.168.3.207:8081",//"http://192.168.3.252:6021",
                ws: true,
                changOrigin: true,
            },
            '/gds/':{
                target:'http://47.106.155.169:8081',//"http://192.168.3.207:8081",//"http://192.168.3.252:6021",
                ws: true,
                changOrigin: true,
            },
            '/index/':{
                target:'http://47.106.155.169:8081',//"http://192.168.3.207:8081",//"http://192.168.3.252:6021",
                ws: true,
                changOrigin: true,
            },
            '/cnt/':{
                target:'http://47.106.155.169:8081',//'http://192.168.3.119:8083',//"http://192.168.3.207:8081",//"http://192.168.3.252:6021",
                ws: true,
                changOrigin: true,
            }
        }, // 设置代理
        before: app => {}
    }
};
