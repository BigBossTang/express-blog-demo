<h1>express-blog-demo</h1>
<h3>数据库配置</h3>
<h4>1.在models/db.js中修改数据库连接配置</h4>
<h4>2.本地数据库新建库blog</h4>
<h4>3.blog下建两张表: user和text</h4>
  user表中有三个字段：<br/>
    第一个为id，类型为int，自动增量，不允许为空；<br/>
    第二个为name，类型为varchar，长度为255，字符集为utf8，不允许为空；<br/>
    第三个为password，类型为varchar，长度为255，字符集为utf8，不允许为空；<br/>
  text表中有4个字段：<br/>
    第一个为id，类型为int，自动增量，不允许为空；<br/>
    第二个为users，类型为varchar，长度为255，字符集为utf8，不允许为空；(为发表这个博客的用户)<br/>
    第三个为text，类型为text,字符集为utf8，不允许为空；(博客的内容)<br/>
    第四个为ctime,类型为datetime,允许为空，默认为空。(为博客的创建时间)<br/>
<h3>启动项目</h3>
根目录下执行 <strong>npm install</strong> 安装依赖， 完成后<strong>npm start<strong/> 启动项目， 访问地址127.0.0.1;
