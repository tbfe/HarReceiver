// ¬∑æ∂≈‰÷√
require.config({
    baseUrl: "/javascripts",
    paths: {
        echarts: '/bower_components/echarts/build/dist',
        jquery: '/bower_components/jquery/dist/jquery.min',
        lodash: '/bower_components/lodash/lodash.min',
        semantic: '/bower_components/semantic-ui/dist/semantic'
    },
    shim: {
        semantic: ['jquery']
    }
});