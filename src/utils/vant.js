import Vue from 'vue'


import { Button, Image as VanImage, Form,Col, Row, Empty,Progress, Field,Slider, Icon, Dialog, NavBar, Calendar, Search, Toast,Cell,CellGroup, Loading, List,Picker,Popup,PullRefresh,Checkbox,Uploader,CountDown,DatetimePicker,Switch,Tab, Tabs,DropdownMenu, DropdownItem,TreeSelect,SwipeCell,Overlay, } from 'vant';
const components = [Button,VanImage, Form,Col, Row,Empty,Progress, Field,Slider, Icon, Dialog, NavBar, Calendar, Search, Toast,Cell,CellGroup, Loading, List,Picker,Popup,PullRefresh,Checkbox,Uploader,CountDown,DatetimePicker,Switch,Tab, Tabs,DropdownMenu, DropdownItem,TreeSelect,SwipeCell,Overlay,];

components.forEach((cur) => {
  Vue.use(cur);
})
