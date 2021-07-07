import { useState, useEffect } from 'react';
// import Navs from './SwiperTabs/nav_data';
import { useWidgetSettings } from '../../hooks';

// 导航
const useNavData = (widgetName = '', defaultData) => {
  // const [histories, setHistories] = useState([]);
  const histories = [];
  const { getWidgetSetting, updateWidgetSetting } = useWidgetSettings();
  const initialData = defaultData?.local || getWidgetSetting({ name: widgetName }) || [];
  const [data, setData] = useState(initialData);
  const updateNavs = (list) => {
    setData(list);
    updateWidgetSetting({ name: widgetName, data: list });
  };
  const addNav = (app) => {
    let existed = data.filter((item) => item.url == app.url);
    if (existed.length != 0) {
      return { success: false, msg: '地址已存在' };
    }

    setData((prev) => {
      let newData = [...prev, app];
      updateWidgetSetting({ name: widgetName, data: newData });
      return newData;
    });
    return { success: true, data };
  };
  const removeNav = (url) => {
    setData((prev) => {
      let newData = prev.filter((item) => {
        return item.url !== url;
      });
      updateWidgetSetting({ name: widgetName, data: newData });
      return newData;
    });
  };
  return { data, histories, addNav, removeNav, updateNavs };
};
// 右键菜单
const useContextMenu = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [widget, setWidget] = useState(undefined);
  const showMenu = ({ position, widget }) => {
    setPosition(position);
    setWidget(widget);
    setVisible(true);
  };
  const hideMenu = () => {
    setWidget(undefined);
    setVisible(false);
  };
  useEffect(() => {
    document.onclick = () => {
      hideMenu();
    };
    return () => {
      document.onclick = null;
    };
  }, []);
  return { menuVisible: visible, position, widget, showMenu, hideMenu };
};

export { useContextMenu, useNavData };
