> nunjucks js模板引擎

1. 模板继承

        base.html
        <html>
            <body>
                {% block header %} <h3>header</h3> {% endblock %}
                {% block body %} <div>No body</div> {% endblock %}
                {% block footer %} <div>copyright</div> {% endblock %}
             </body>
        </html>
        
        index.html
        
        {% extends 'base.html' %}
        
        {% block header %}<h1>{{ header }}</h1>{% endblock %}
        
        {% block body %}<p>{{ body }}</p>{% endblock %}        

2. 标签

3. API


[官方文档](http://mozilla.github.io/nunjucks/api.html)

[教程文档](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014713964925087c29166d8c344a949364e40e2f28dc09000)