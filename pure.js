var fis = module.exports = require('fis');

fis.cli.name = 'fis-pure';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

fis.config.merge({
    statics: '/static',
    modules: {
        parser: {
            less: 'less',
            tmpl: 'bdtmpl'
        },
        postprocessor: {
            js: "jswrapper, require-async",
            html: "require-async"
        },
        postpackager : 'reqmin',
        prepackager : 'autoload',
        lint : {
            js : 'jshint'
        }
    },
    roadmap: {
        ext: {
            less: 'css',
            tmpl: 'js'
        },
        path : [
            {
                //一级同名组件，可以引用短路径，比如modules/jquery/juqery.js
                //直接引用为var $ = require('jquery');
                reg : /^\/modules\/([^\/]+)\/\1\.(js)$/i,
                //是组件化的，会被jswrapper包装
                isMod : true,
                //id为文件夹名
                id : '$1',
                release : '${statics}/$&'
            },
            {
                //modules目录下的其他文件
                reg : /^\/modules\/(.*)\.(js)$/i,
                //是组件化的，会被jswrapper包装
                isMod : true,
                //id是去掉modules和.js后缀中间的部分
                id : '$1',
                release : '${statics}/$&'
            },
            {
                //其他css文件
                reg : "**.css",
                //css文件会做csssprite处理
                useSprite : true,
                release : '${statics}/$&'
            },
            {
                reg : /.*\.(html|jsp|tpl|vm|htm|asp|aspx)/,
                release : '$&'
            },
            {
                reg : "README.md",
                release : false
            },
            {
                reg : "**",
                release : '${statics}/$&'
            }
        ]
    },
    settings: {
        postprocessor: {
            jswrapper: {
                type: 'amd'
            }
        },
        jshint : {
            //using Chinese reporter
            i18n : 'zh-CN',
            camelcase : true,
            curly : true,
            eqeqeq : true,
            forin : true,
            immed : true,
            latedef : true,
            newcap : true,
            noarg : true,
            noempty : true,
            node : true
        }
    }
});