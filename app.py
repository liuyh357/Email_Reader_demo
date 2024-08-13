


from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder='public', static_url_path='')

@app.route('/')
def serve_static():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/get-text', methods=['GET'])



def get_text():
    avatar_id = request.args.get('avatarId')
    # 根据avatar_id从数据库或其他数据源获取文本
    text = f"这是头像{avatar_id}对应的文本"
    return jsonify({"text": text})

@app.route('/api/get-info', methods=['GET'])
def get_info():
    avatar_id = request.args.get('avatarId')
    field = request.args.get('field')
    # 根据avatar_id和field从数据库或其他数据源获取信息
    info = f"这是头像{avatar_id}的{field}"
    return jsonify({"value": info})

if __name__ == '__main__':
    app.run(debug=True)



