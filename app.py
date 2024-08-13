


# from flask import Flask, jsonify, request, send_from_directory
# import dashscope
# from http import HTTPStatus
# import json
# import re

# app = Flask(__name__, static_folder='public', static_url_path='')

# def translate_to_chinese(api_key, user_input):
#     dashscope.api_key = api_key
#     prompt = "你是一个受众调研专家，下面我讲输入一段文本邮件，请你根据文本内容，分析谁最可能是该段文本邮件的受众。你需要返回五个最可能的受众。"
#     prompt += "即使文本内容太少，不足以分析，你也要返回五种职业、年龄不同的、尽可能覆盖到大多数人的受众。"  # 防止内容太少，LLM处于严谨返回均为未知
#     prompt += "年龄要精确到整数，而不是范围；性别需要你设定，要么男要么女；关系你也要指定。"  # 防止出现范围或者位置
#     prompt += "你的返回格式是:[{'occupation':xx,'age':xx,'gender':xx,'relationship':xx},......]"  # 防止格式问题
#     prompt += "你的返回必须是英文的。"  # 防止解析失败
#     prompt += "你只需要返回这样的列表中嵌套字典的格式就可以，不需要多余的文字。下面是文本邮件内容："
#     prompt += user_input

#     response = dashscope.Generation.call(
#         model=dashscope.Generation.Models.qwen_max,
#         prompt=prompt
#     )

#     if response.status_code == HTTPStatus.OK:
#         translation = response.output.text
#         # 打印返回的结果
#         print("\n\n\n~~~~~~~~~~~~~~~~~~~~")
#         print("Qwen 返回的结果:")
#         print(translation)
#         # 修复 JSON 格式：将单引号替换为双引号
#         translation = re.sub(r"'(\w+)'", r'"\1"', translation)
#         try:
#             translation_list = json.loads(translation)
#             return translation_list
#         except json.JSONDecodeError as e:
#             print(f"JSON解析错误: {e}")
#             return None
#     else:
#         print(f"Error Code: {response.code}")
#         print(f"Error Message: {response.message}")
#         return None

# @app.route('/')
# def serve_static():
#     return send_from_directory(app.static_folder, 'index.html')

# @app.route('/api/get-text', methods=['GET'])
# def get_text():
#     avatar_id = request.args.get('avatarId')
#     text = f"这是头像{avatar_id}对应的文本"
#     return jsonify({"text": text})

# @app.route('/api/get-info', methods=['GET'])
# def get_info():
#     avatar_id = request.args.get('avatarId')
#     field = request.args.get('field')
#     info = f"这是头像{avatar_id}的{field}"
#     return jsonify({"value": info})

# @app.route('/analyze', methods=['POST'])
# def analyze():
#     api_key = "sk-c30672bc9ae049cd88fa9f81e3405cff"  # 替换为你的通义千问API密钥
#     user_input = request.form['user_input']
#     translation_list = translate_to_chinese(api_key, user_input)
#     print("\n\n\n~~~~~~~~~~~~~~~~~~~~")
#     print(jsonify(translation_list))
#     return jsonify(translation_list)

# @app.route('/generate-feedback', methods=['POST'])
# def generate_feedback():
#     api_key = "sk-c30672bc9ae049cd88fa9f81e3405cff"  # 替换为你的通义千问API密钥
#     user_input = request.form['user_input']
#     occupation = request.form['occupation']
#     age = request.form['age']
#     gender = request.form['gender']
#     relationship = request.form['relationship']

#     prompt = f"你是一个{occupation},{age},{gender},你收到一封邮件，你是发件人的{relationship},请你以你的身份分析这封邮件内容是否有表达不恰当（语义含糊、词语晦涩、表达不清楚、不礼貌）的地方，并以你的tune指出。"
#     prompt += "邮件内容：" + user_input

#     response = dashscope.Generation.call(
#         model=dashscope.Generation.Models.qwen_max,
#         prompt=prompt
#     )

#     if response.status_code == HTTPStatus.OK:
#         feedback = response.output.text
#         return jsonify({"feedback": feedback})
#     else:
#         print(f"Error Code: {response.code}")
#         print(f"Error Message: {response.message}")
#         return jsonify({"feedback": "生成反馈失败，请重试。"})

# if __name__ == '__main__':
#     app.run(debug=True)





from flask import Flask, jsonify, request, send_from_directory
import dashscope
from http import HTTPStatus
import json
import re

app = Flask(__name__, static_folder='public', static_url_path='')

def translate_to_chinese(api_key, user_input):
    dashscope.api_key = api_key
    prompt = "你是一个受众调研专家，下面我讲输入一段文本邮件，请你根据文本内容，分析谁最可能是该段文本邮件的受众。你需要返回五个最可能的受众。"
    prompt += "即使文本内容太少，不足以分析，你也要返回五种职业、年龄不同的、尽可能覆盖到大多数人的受众。"  # 防止内容太少，LLM处于严谨返回均为未知
    prompt += "年龄要精确到整数，而不是范围；性别需要你设定，要么男要么女；关系你也要指定。"  # 防止出现范围或者位置
    prompt += "你的返回格式是:[{'occupation':xx,'age':xx,'gender':xx,'relationship':xx},......]"  # 防止格式问题
    prompt += "你的返回必须是英文的。"  # 防止解析失败
    prompt += "你只需要返回这样的列表中嵌套字典的格式就可以，不需要多余的文字。下面是文本邮件内容："
    prompt += user_input

    response = dashscope.Generation.call(
        model=dashscope.Generation.Models.qwen_max,
        prompt=prompt
    )

    if response.status_code == HTTPStatus.OK:
        translation = response.output.text
        # 打印返回的结果
        print("\n\n\n~~~~~~~~~~~~~~~~~~~~")
        print("Qwen 返回的结果:")
        print(translation)
        # 修复 JSON 格式：将单引号替换为双引号
        translation = re.sub(r"'(\w+)'", r'"\1"', translation)
        try:
            translation_list = json.loads(translation)
            return translation_list
        except json.JSONDecodeError as e:
            print(f"JSON解析错误: {e}")
            return None
    else:
        print(f"Error Code: {response.code}")
        print(f"Error Message: {response.message}")
        return None

@app.route('/')
def serve_static():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/get-text', methods=['GET'])
def get_text():
    avatar_id = request.args.get('avatarId')
    text = f"这是头像{avatar_id}对应的文本"
    return jsonify({"text": text})

@app.route('/api/get-info', methods=['GET'])
def get_info():
    avatar_id = request.args.get('avatarId')
    field = request.args.get('field')
    info = f"这是头像{avatar_id}的{field}"
    return jsonify({"value": info})

@app.route('/analyze', methods=['POST'])
def analyze():
    api_key = "sk-c30672bc9ae049cd88fa9f81e3405cff"  # 替换为你的通义千问API密钥
    user_input = request.form['user_input']
    translation_list = translate_to_chinese(api_key, user_input)
    print("\n\n\n~~~~~~~~~~~~~~~~~~~~")
    print(jsonify(translation_list))
    return jsonify(translation_list)

@app.route('/generate-feedback', methods=['POST'])
def generate_feedback():
    api_key = "sk-c30672bc9ae049cd88fa9f81e3405cff"  # 替换为你的通义千问API密钥
    user_input = request.form['user_input']
    occupation = request.form['occupation']
    age = request.form['age']
    gender = request.form['gender']
    relationship = request.form['relationship']

    prompt = f"你是一个{occupation},{age},{gender},你收到一封邮件，你是发件人的{relationship},请你对这封邮件内容进行反馈。"
    prompt += "邮件内容：" + user_input

    response = dashscope.Generation.call(
        model=dashscope.Generation.Models.qwen_max,
        prompt=prompt
    )

    if response.status_code == HTTPStatus.OK:
        feedback = response.output.text
        return jsonify({"feedback": feedback})
    else:
        print(f"Error Code: {response.code}")
        print(f"Error Message: {response.message}")
        return jsonify({"feedback": "生成反馈失败，请重试。"})

@app.route('/generate-reply', methods=['POST'])
def generate_reply():
    api_key = "sk-c30672bc9ae049cd88fa9f81e3405cff"  # 替换为你的通义千问API密钥
    user_input = request.form['user_input']
    occupation = request.form['occupation']
    age = request.form['age']
    gender = request.form['gender']
    relationship = request.form['relationship']

    prompt = f"你是一个{occupation},{age},{gender},你收到一封邮件，你是发件人的{relationship}，请你回信。"
    prompt += "邮件内容：" + user_input

    response = dashscope.Generation.call(
        model=dashscope.Generation.Models.qwen_max,
        prompt=prompt
    )

    if response.status_code == HTTPStatus.OK:
        reply = response.output.text
        return jsonify({"reply": reply})
    else:
        print(f"Error Code: {response.code}")
        print(f"Error Message: {response.message}")
        return jsonify({"reply": "生成回信失败，请重试。"})

if __name__ == '__main__':
    app.run(debug=True)
