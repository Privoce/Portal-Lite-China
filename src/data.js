import { lazy } from 'react';
const Vera = lazy(() =>
  import(/* webpackChunkName: "widget.Vera" */ './widgets/Vera')
);
const Searchs = lazy(() => import(/* webpackChunkName: "widget.searchs" */ './widgets/Searchs'));
const NavBlock = lazy(() => import(/* webpackChunkName: "widget.navs" */ './widgets/Navs'));
const WeiboHot = lazy(() =>
  import(/* webpackChunkName: "widget.weibo.hot" */ './widgets/WeiboHot')
);
const MPDaily = lazy(() => import(/* webpackChunkName: "widget.mp.daily" */ './widgets/MPDaily'));
const Weather = lazy(() => import(/* webpackChunkName: "widget.weather" */ './widgets/Weather'));
const Covid = lazy(() => import(/* webpackChunkName: "widget.covid" */ './widgets/Covid'));
const LifeProgress = lazy(() =>
  import(/* webpackChunkName: "widget.life.progress" */ './widgets/LifeProgress')
);
const MyAgenda = lazy(() =>
  import(/* webpackChunkName: "widget.my.agenda" */ './widgets/MyAgenda')
);
const USCovid = lazy(() => import(/* webpackChunkName: "widget.uscovid" */ './widgets/USCovid'));
const TimezoneClock = lazy(() =>
  import(/* webpackChunkName: "widget.timezone.clock" */ './widgets/TimezoneClock')
);
const RelationshipCalc = lazy(() =>
  import(/* webpackChunkName: "widget.relationship.calc" */ './widgets/RelationshipCalc')
);
const GithubTrending = lazy(() =>
  import(/* webpackChunkName: "widget.github.trend" */ './widgets/GithubTrending')
);
const GithubDashboard = lazy(() =>
  import(/* webpackChunkName: "widget.github.repos" */ './widgets/GithubDashboard')
);
const ZhihuHot = lazy(() =>
  import(/* webpackChunkName: "widget.zhihu.hot" */ './widgets/ZhihuHot')
);
const DoubanHotTopics = lazy(() =>
  import(/* webpackChunkName: "widget.douban.topics" */ './widgets/DoubanHotTopics')
);
const TodayInHistory = lazy(() =>
  import(/* webpackChunkName: "widget.douban.topics" */ './widgets/TodayInHistory')
);
const YiYan = lazy(() => import(/* webpackChunkName: "widget.yiyan" */ './widgets/YiYan'));
const PetPics = lazy(() => import(/* webpackChunkName: "widget.pet.pics" */ './widgets/PetPics'));
const DailyShici = lazy(() =>
  import(/* webpackChunkName: "widget.daily.shici" */ './widgets/DailyShiCi')
);
const BingDailyPicture = lazy(() =>
  import(/* webpackChunkName: "widget.bing.pics" */ './widgets/BingDailyPicture')
);
const Calc = lazy(() => import(/* webpackChunkName: "widget.calc" */ './widgets/Calc'));
const YinNote = lazy(() => import(/* webpackChunkName: "widget.yin.note" */ './widgets/YinNote'));

let Widgets = {
  searchs: {
    preset: true,
    type: 'search',
    title: '搜索引擎',
    description: '百度、谷歌、必应',
    enableSetting: true,
    compact: true,
    disableScroll: true,
    comp: <Searchs />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.searchs.png',
    created: '2020-12-14',
    updated: '2021-03-16'
  },
  navs: {
    preset: true,
    type: 'nav',
    title: '导航',
    description: '页面导航集合地',
    compact: true,
    disableScroll: true,
    comp: <NavBlock />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.navs.png',
    created: '2020-12-12',
    updated: '2021-03-19'
  },
  'covid-info': {
    title: '🇨🇳 国内新冠疫情概况',
    description: '快速了解国内每日疫情概况',
    compact: true,
    preset: false,
    disableScroll: true,
    comp: <Covid />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.covid.data.png',
    created: '2020-12-24',
    updated: '2020-12-28',
    locales: ['zh-CN']
  },
  'us-covid-info': {
    title: '🇺🇸 美国新冠疫情概况',
    description: '快速了解美利坚每日疫情概况',
    compact: true,
    disableScroll: true,
    comp: <USCovid />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.usa.covid.png',
    created: '2021-02-01',
    updated: '2021-02-02',
    locales: ['en-US']
  },
  'wb-hot': {
    title: '微博热搜',
    description: '微博实时热搜，你想了解的，都在这里！',
    defaultSize: 'large',
    sizes: ['middle', 'large'],
    comp: <WeiboHot />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.hot.weibo.png',
    created: '2020-12-17',
    updated: '2020-12-28',
    locales: ['zh-CN']
  },
  'vera': {
    extension: true,
    compact: true,
    preset: true,
    title: 'Vera小组件',
    description: 'Vera链接历史记录',
    defaultSize: 'large',
    sizes: ['middle', 'large'],
    comp: <Vera />,
    enableSetting: false,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.vera.history.jpg',
    created: '2021-03-22',
    updated: '2021-03-22'
  },
  'my-agenda': {
    // loadType: 'script',
    preset: false,
    title: '我的日程',
    description: '快捷查看您的日常日程，目前仅支持谷歌日历',
    defaultSize: 'large',
    sizes: ['middle', 'large'],
    comp: <MyAgenda />,
    enableSetting: true,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.gc.png',
    created: '2021-02-24',
    updated: '2021-03-14',
    locales: ['en-US']
  },
  weather: {
    loadType: 'script',
    preset: false,
    title: '今日天气',
    description: '全方位，多角度，为您提供天气信息。',
    compact: true,
    disableScroll: true,
    comp: <Weather />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.weather.png',
    created: '2020-12-04',
    updated: '2020-12-23',
    locales: ['zh-CN']
  },
  'relationship-calc': {
    title: '👨‍👩‍👧‍👦 亲戚关系计算器',
    description:
      '放假回家过年时，往往会搞不清楚哪位亲戚应该喊什么称呼，很是尴尬。亲戚关系计算器帮你避免这种尴尬！',
    defaultSize: 'large',
    sizes: ['large'],
    compact: true,
    disableScroll: true,
    comp: <RelationshipCalc />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.relationship.calc.png',
    created: '2021-02-08',
    locales: ['zh-CN']
  },
  'timezone-clock': {
    title: '国际时钟',
    description: '便捷查看多个时区时间，最多支持添加三个。',
    enableSetting: true,
    compact: true,
    // preset: true,
    disableScroll: true,
    comp: <TimezoneClock />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.world.clock.png',
    created: '2021-01-18',
    updated: '2021-02-02'
  },
  yiyan: {
    title: '一言',
    description:
      '简单来说，一言指的就是一句话，可以是动漫中的台词，也可以是网络上的各种小段子。 或是感动，或是开心，有或是单纯的回忆。',
    compact: true,
    // preset: true,
    disableScroll: true,
    comp: <YiYan />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.yiyan.png',
    created: '2021-01-18',
    updated: '2021-01-27',
    locales: ['zh-CN']
  },
  'pet-pics': {
    title: '宠物图集',
    description: '萌宠图：猫猫狗狗以及可爱的小鸟',
    enableSetting: true,
    compact: true,
    disableScroll: true,
    comp: <PetPics />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.pet.pics.png',
    created: '2021-02-3',
    locales: ['zh-CN']
  },

  'mp-daily-hot': {
    title: '公众号24小时热文',
    description: '公众号实时热文，你想了解的，都在这里！',
    sizes: ['middle', 'large'],
    comp: <MPDaily />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.hot.mp.png',
    locales: ['zh-CN']
  },
  'daily-shici': {
    title: '今日诗词',
    description: '每天一句诗词，根据时间、地点、天气、事件智能推荐',
    compact: true,
    sizes: ['middle', 'large'],
    comp: <DailyShici />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.daily.shici.png',
    locales: ['zh-CN']
  },
  'zhihu-hot': {
    title: '知乎热搜榜',
    enableSetting: true,
    sizes: ['middle', 'large'],
    description: '知乎实时热搜，你想了解的，都在这里！',
    compact: true,
    comp: <ZhihuHot />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.hot.zhihu.png',
    locales: ['zh-CN']
  },
  'gh-dashboard': {
    title: 'Github个人仓库',
    sizes: ['middle', 'large'],
    description: '通过授权，展现您个人仓库列表，快速预览每个仓库的概况。',
    compact: true,
    comp: <GithubDashboard />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.github.repo.png'
  },

  'bing-daily-pic': {
    title: '必应壁纸',
    description: '快速浏览与下载必应高清壁纸',
    compact: true,
    disableScroll: true,
    comp: <BingDailyPicture />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.bing.pics.png',
    created: '2021-01-18',
    updated: '2021-01-27',
    locales: ['zh-CN']
  },
  'douban-topic-hot': {
    title: '豆瓣24小时话题',
    description: '直达豆瓣24小时热门话题',
    comp: <DoubanHotTopics />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.douban.topic.png',
    created: '2021-01-19',
    locales: ['zh-CN']
  },
  'today-in-history': {
    title: '历史上的今天',
    description: '历史上的今天，发生了哪些著名事件呢？',
    compact: true,
    sizes: ['middle', 'large'],
    comp: <TodayInHistory />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.today.in.history.png',
    created: '2021-03-03',
    locales: ['zh-CN']
  },

  'gh-trending': {
    title: 'Github趋势',
    description: 'GitHub趋势榜，有开发者和仓库两大分类，让您不再错过GitHub热门仓库',
    compact: true,
    sizes: ['middle', 'large'],
    comp: <GithubTrending />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.github.trending.png'
  },
  calc: {
    loadType: 'iframe',
    title: '计算器',
    description: '一个科学计算器',
    comp: <Calc />,
    defaultSize: 'large',
    sizes: ['fullscreen', 'middle', 'large'],
    disableScroll: true,
    compact: true,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.calc.png'
  },
  'life-progress': {
    loadType: 'iframe',
    title: '生命进程计算器',
    description: '计算您还能活多久，又名：焦虑制造器。😥',
    comp: <LifeProgress />,
    defaultSize: 'large',
    // sizes: ['middle', 'large'],
    disableScroll: true,
    compact: true,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.life.progress.png',
    created: '2021-02-03',
    locales: ['zh-CN']
  },
  'yin-note': {
    title: '印象笔记',
    description: '快速录入印象笔记【暂未开发】',
    disableScroll: true,
    comp: <YinNote />,
    screenshot: 'https://static.nicegoodthings.com/privoce/widget.yinxiang.note.png',
    locales: ['zh-CN']
  }
};
export { Widgets };
