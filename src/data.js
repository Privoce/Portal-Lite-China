import { lazy } from 'react';
import Navs from './widgets/Navs/SwiperTabs/nav_data';
import AllTools from './widgets/Navs/SwiperTabs/tool_data';
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
const TaskNote = lazy(() =>
  import(/* webpackChunkName: "widget.task.note" */ './widgets/TaskNote')
);

const Webapps = Navs[0].items;
const Tools = AllTools[0].items;
let Widgets = {
  searchs: {
    type: 'search',
    title: '搜索引擎',
    description: '百度、谷歌、必应',
    enableSetting: true,
    compact: true,
    preset: true,
    disableScroll: true,
    comp: <Searchs />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.searchs.png',
    created: '2020-12-14',
    updated: '2020-12-24'
  },
  navs: {
    type: 'nav',
    title: '导航',
    description: '页面导航集合地',
    compact: true,
    preset: true,
    disableScroll: true,
    comp: <NavBlock />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.navs.png',
    created: '2020-12-12',
    updated: '2020-12-18'
  },
  'covid-info': {
    title: '🇨🇳 国内新冠疫情概况',
    description: '快速了解国内每日疫情概况',
    compact: true,
    preset: true,
    disableScroll: true,
    comp: <Covid />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.covid.data.png',
    created: '2020-12-24',
    updated: '2020-12-28'
  },
  'us-covid-info': {
    title: '🇺🇸 美国新冠疫情概况',
    description: '快速了解美利坚每日疫情概况',
    compact: true,
    disableScroll: true,
    comp: <USCovid />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.usa.covid.png',
    created: '2021-02-01',
    updated: '2021-02-02'
  },
  'wb-hot': {
    preset: true,
    title: '微博热搜',
    description: '微博实时热搜，你想了解的，都在这里！',
    defaultSize: 'large',
    sizes: ['middle', 'large'],
    comp: <WeiboHot />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.hot.weibo.png',
    created: '2020-12-17',
    updated: '2020-12-28'
  },
  weather: {
    loadType: 'script',
    preset: true,
    title: '今日天气',
    description: '全方位，多角度，为您提供天气信息。',
    compact: true,
    disableScroll: true,
    comp: <Weather />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.weather.png',
    created: '2020-12-04',
    updated: '2020-12-23'
  },
  'relationship-calc': {
    title: '👨‍👩‍👧‍👦 亲戚关系计算器',
    description:
      '放假回家过年时，往往会搞不清楚哪位亲戚应该喊什么称呼，很是尴尬。亲戚关系计算器帮你避免这种尴尬！',
    // enableSetting: true,
    defaultSize: 'large',
    sizes: ['large'],
    compact: true,
    preset: true,
    disableScroll: true,
    comp: <RelationshipCalc />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.relationship.calc.png',
    created: '2021-02-08'
  },
  'timezone-clock': {
    title: '国际时钟',
    description: '便捷查看多个时区时间，最多支持添加三个。',
    enableSetting: true,
    compact: true,
    preset: true,
    disableScroll: true,
    comp: <TimezoneClock />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.world.clock.png',
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
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.yiyan.png',
    created: '2021-01-18',
    updated: '2021-01-27'
  },
  'pet-pics': {
    title: '宠物图集',
    description: '萌宠图：猫猫狗狗以及可爱的小鸟',
    enableSetting: true,
    compact: true,
    // preset: true,
    disableScroll: true,
    comp: <PetPics />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.pet.pics.png',
    created: '2021-02-3'
  },

  'mp-daily-hot': {
    title: '公众号24小时热文',
    description: '公众号实时热文，你想了解的，都在这里！',
    sizes: ['middle', 'large'],
    comp: <MPDaily />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.hot.mp.png'
  },
  'daily-shici': {
    title: '今日诗词',
    description: '每天一句诗词，根据时间、地点、天气、事件智能推荐',
    compact: true,
    sizes: ['middle', 'large'],
    comp: <DailyShici />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.daily.shici.png'
  },
  'zhihu-hot': {
    title: '知乎热搜榜',
    enableSetting: true,
    sizes: ['middle', 'large'],
    description: '知乎实时热搜，你想了解的，都在这里！',
    compact: true,
    comp: <ZhihuHot />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.hot.zhihu.png'
  },
  'gh-dashboard': {
    title: 'Github个人仓库',
    sizes: ['middle', 'large'],
    description: '通过授权，展现您个人仓库列表，快速预览每个仓库的概况。',
    compact: true,
    comp: <GithubDashboard />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.github.repo.png'
  },

  'bing-daily-pic': {
    // preset: true,
    title: '必应壁纸',
    description: '快速浏览与下载必应高清壁纸',
    compact: true,
    disableScroll: true,
    comp: <BingDailyPicture />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.bing.pics.png',
    created: '2021-01-18',
    updated: '2021-01-27'
  },
  'douban-topic-hot': {
    // preset: true,
    title: '豆瓣24小时话题',
    description: '直达豆瓣24小时热门话题',
    // compact: true,
    // disableScroll: true,
    comp: <DoubanHotTopics />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.douban.topic.png',
    created: '2021-01-19'
  },
  'today-in-history': {
    // preset: true,
    title: '历史上的今天',
    description: '历史上的今天，发生了哪些著名事件呢？',
    compact: true,
    sizes: ['middle', 'large'],
    // disableScroll: true,
    comp: <TodayInHistory />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.today.in.history.png',
    created: '2021-03-03'
  },

  'gh-trending': {
    title: 'Github趋势',
    description: 'GitHub趋势榜，有开发者和仓库两大分类，让您不再错过GitHub热门仓库',
    compact: true,
    sizes: ['middle', 'large'],
    comp: <GithubTrending />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.github.trending.png'
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
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.calc.png'
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
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.life.progress.png',
    created: '2021-02-03'
  },
  'yin-note': {
    title: '印象笔记',
    description: '快速录入印象笔记【暂未开发】',
    disableScroll: true,
    comp: <YinNote />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.yinxiang.note.png'
  },
  'task-note': {
    title: '任务笔记',
    description: '快速录入印象笔记【暂未开发】',
    disableScroll: true,
    sizes: ['fullscreen', 'middle', 'large'],
    comp: <TaskNote />,
    screenshot: 'https://gitee.com/zyanggc/oss/raw/master/works/widget.yinxiang.note.png'
  }
};
// 过滤掉不适合在浏览器扩展里加载的小组件
if (process.env.REACT_APP_CHROME_EXT == 'true') {
  Widgets = Object.fromEntries(
    Object.entries(Widgets).filter(([, obj]) => {
      return !['script'].includes(obj.loadType);
    })
  );
}
export { Webapps, Tools, Widgets };
