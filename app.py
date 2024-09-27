from flask import Flask, render_template,request, redirect,url_for
from models import db, Option,Form,Question
from settings import url, db

app = Flask(__name__)

app.secret_key = b'e4;N9[Q3GOoJBO-4I-S[x'

app.config['SQLALCHEMY_DATABASE_URI'] = url

db.init_app(app)

with app.app_context():

    db.create_all()
    
@app.route('/criar-formulario', methods=['GET','POST'])

def criarformulario():

    if request.method == 'POST':
        descricao = request.form['description']

        titulo = request.form['title']
       

        n_formulario = Form(description=descricao,title=titulo)

        textos = request.form.getlist('quest')
        tipos = request.form.getlist('type')

        for index in range(len(tipos)):
            q_tipo = tipos[index]
            
            q_texto = textos[index]
         
            n_questao = Question( form=n_formulario,question_text=q_texto,question_type=q_tipo)
            
         
            if q_tipo in ['multiple_choice', 'checkbox']:

                op = request.form.getlist('opcao')

                lista = []

                for texto_ops in op:

                    if texto_ops: 

                        n_opcao = Option( question=n_questao,option_text=texto_ops)


                        lista.append(n_opcao)

                        db.session.add(n_opcao)
                        
                if len(lista) == 0:

                    return redirect(url_for('criarformulario'))

            db.session.add(n_questao)

        db.session.add(n_formulario)  

        db.session.commit()  

        return redirect(url_for('inicio')) 

    return render_template('criarformulario.html')
    

@app.route('/')
def inicio():
    formularios = Form.query.all()
    return render_template('inicio.html', formularios=formularios)

if __name__ == '__main__':
    app.run(debug=True)