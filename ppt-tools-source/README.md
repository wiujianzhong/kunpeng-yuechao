# 嘉新和天虹问题整改 PPT 生成工具

两套工具均可直接打开使用，无需注册、设备码或授权服务器。首次打开会显示工具介绍，点“确认，开始使用”即可进入。上传现场照片，填写整改前后说明，或导入已有 PPTX，再按对应公司模板生成可编辑的 PPTX。中文和中文加拼音都可导出。

| 版本 | 正式网页 | 页面源码 | 模板与桌面图标 |
| --- | --- | --- | --- |
| 嘉新 | [打开嘉新版](https://jx.xiaowustudio.cn/) | [caresun-ppt-tool.html](../caresun-ppt-tool.html) | [嘉新资源](../jiaxin-ppt-web/) |
| 天虹 | [打开天虹版](https://th.xiaowustudio.cn/) | [texhong-ppt-tool.html](../texhong-ppt-tool.html) | [天虹资源](../texhong-ppt-web/)、[Logo](../texhong-logo-transparent.png)、[封面](../texhong-cover.jpg)、[页眉](../texhong-header.jpg) |

## 本地运行

下载本仓库并解压。在包含上述两个 HTML 文件的目录中运行以下命令。

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

在浏览器中打开 [本机嘉新版](http://127.0.0.1:8000/caresun-ppt-tool.html) 或 [本机天虹版](http://127.0.0.1:8000/texhong-ppt-tool.html)。页面直接引用仓库中的 [前端依赖](../vendor/)，无需安装后台服务或配置 API 密钥。手机通过外网使用桌面安装功能时，请通过 HTTPS 发布。

## 数据和品牌素材

照片、导入文件、说明文字和草稿在当前浏览器处理。重要结果请导出备份。两版各有独立的正式域名。公司 Logo、模板图片和第三方库的权利仍归各自权利人。
