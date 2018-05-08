<template>
    <div class="main">
        <div class='banner'>
            <img src="../../images/ugc_sign/banner.png" />
        </div>
        <img src="../../images/ugc_sign/rule1.png" />
        <img src="../../images/ugc_sign/rule2.png" />
        <img src="../../images/ugc_sign/rule3.png" />
        <img src="../../images/ugc_sign/rule4.png" />
        <div class="form-container">
            <div class="form">
                <div class="form-title">
                    <img src="../../images/ugc_sign/form_title.png" />
                </div>
                <div class="form-body">
                    <div class="name form-group">
                        <label class="inline-label">Name: </label>
                        <input type="text" name="name" />
                    </div>
                    <div class="gender form-group">
                        <label class="inline-label">Gender: </label>
                        <div class="radio-option">
                            <input id="female" v-model="gender" name="gender" type="radio" value="0" />
                            <label for="female">
                                <div class="radio-ui"></div>
                                <div class="option-text">Female</div>
                            </label>
                        </div>
                        <div class="radio-option">
                            <input id="male" v-model="gender" name="gender" type="radio" value="1" />
                            <label for="male">
                                <div class="radio-ui"></div>
                                <div class="option-text">Male</div>
                            </label>
                        </div>
                    </div>
                    <div class="mobile form-group">
                        <label class="inline-label">Phone:</label>
                        <div class="mobile-input">
                            <span class="mobile-input__prefix">+62</span>
                            <input type="text" name="mobile" />
                        </div>
                    </div>
                    <div class="line_id form-group">
                        <label class="block-label">Line ID: </label>
                        <input type="text" name="line_id" />
                    </div>
                    <div class="instagram_id form-group">
                        <label class="block-label">Instagram ID: </label>
                        <input type="text" name="instagram_id" />
                    </div>
                    <div class="facebook_id form-group">
                        <label class="block-label">Facebook ID: </label>
                        <input type="text" name="facebook_id" />
                    </div>
                    <div class="btn">
                        <button class="submit_btn" :disabled="isBtnDisabled" style="position: relative" @click="handleSubmit">
                            submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
function validation(params) {
    var valid = true;

    if (!/^.{1,}$/.test(params.name)) {
        valid = false;
        $("input[name=name]").addClass("has-error");
    } else {
        $("input[name=name]").removeClass("has-error");
    }

    if (!/^\d{1,}$/.test(params.mobile)) {
        valid = false;
        $("input[name=mobile]").addClass("has-error");
    } else {
        $("input[name=mobile]").removeClass("has-error");
    }

    if (!/^.{1,}$/.test(params.line_id)) {
        valid = false;
        $("input[name=line_id]").addClass("has-error");
    } else {
        $("input[name=line_id]").removeClass("has-error");
    }

    if (!/^.{1,}$/.test(params.instagram_id)) {
        valid = false;
        $("input[name=instagram_id]").addClass("has-error");
    } else {
        $("input[name=instagram_id]").removeClass("has-error");
    }

    return valid;
}
import $ from "webpack-zepto";
export default {
    data() {
        return {
            gender: "0",
            isBtnDisabled: false
        };
    },
    created() {
        document.title = "Rising Star Plan";
    },
    methods: {
        handleSubmit() {
            this.isBtnDisabled = true;
            window.jssdk.callNative("user.current", {}, result => {
                var name = $("input[name=name]").val();
                var mobile = $("input[name=mobile]").val();
                var instagram_id = $("input[name=instagram_id]").val();
                var facebook_id = $("input[name=facebook_id]").val();
                var line_id = $("input[name=line_id]").val();
                var valid_obj = {
                    name: name,
                    mobile: mobile,
                    instagram_id: instagram_id,
                    facebook_id: facebook_id,
                    line_id: line_id
                };
                // 小于10级不能报名
                var user = result.body;
                if (user.level < 10) {
                    window.jssdk.callNative("loadUI", {
                        name: "toast",
                        txt: "Hanya untuk pengguna dengan level 10 keatas",
                        timer: 2
                    });
                    this.isBtnDisabled = false;
                    return;
                }
                // 表单校验
                if (!validation(valid_obj)) {
                    tthis.isBtnDisabled = false;
                    return;
                }

                var params = {
                    user_id: user.user_id,
                    name: name,
                    gender: this.gender,
                    mobile: "+62 " + mobile,
                    instagram_id: instagram_id,
                    facebook_id: facebook_id,
                    line_id: line_id
                };
                window.jssdk.callNative("loadUI", {
                    name: "loading",
                    visible: 1
                });
                tools.request.getBySign(
                    config.appserv_url + "/ugcSignUp/create",
                    params,
                    rd => {
                        window.jssdk.callNative("loadUI", {
                            name: "loading",
                            visible: 0
                        });
                        // 重复注册
                        if (rd.code === 1) {
                            window.jssdk.callNative("loadUI", {
                                name: "toast",
                                txt:
                                    "You have already registered. No need to repeat register.",
                                timer: 2
                            });
                        } else if (rd.code === 0) {
                            // 成功
                            window.jssdk.callNative("loadUI", {
                                name: "toast",
                                txt: "Register success!"
                            });
                        } else if (rd.code === 2) {
                            // 官方主播不能报名
                            window.jssdk.callNative("loadUI", {
                                name: "toast",
                                txt: "Official host tidak boleh mendaftar",
                                timer: 2
                            });
                        } else {
                            // 其他错误
                            window.jssdk.callNative("loadUI", {
                                name: "toast",
                                txt:
                                    "Error " +
                                    rd.code +
                                    ": " +
                                    rd.message +
                                    ". Please try again later.",
                                timer: 2
                            });
                        }
                        this.isBtnDisabled = false;
                    }
                );
            });
        }
    }
};
</script>
<style>
html,
body {
    padding: 0;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    background: #060e2a url("../../images/ugc_sign/bg.jpg") no-repeat;
    background-size: 100% auto;
}

* {
    box-sizing: border-box;
}

img {
    max-width: 100%;
    display: block;
}
</style>

<style lang="scss" scoped>
.banner {
    position: relative;
}

.banner img {
    width: 100%;
    display: block;
}
.form-container {
    background: url(../../images/ugc_sign/form_bg.jpg);
    padding-bottom: 10%;
}

.form {
    color: white;
    border: #316eaa solid 1px;
    width: 89%;
    margin: auto;
    border-radius: 0.4rem;
    font-size: 0.34rem;
}

.form-body {
    padding: 0 5%;
}

.form-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 4% 0;
}

.inline-label {
    width: 21%;
}

.form input {
    border: none;
    padding: 0.22rem;
    border-radius: 0.1rem;
    flex-grow: 1;
}

.mobile-input {
    display: flex;
    align-items: stretch;
    flex-grow: 1;
}

.mobile-input__prefix {
    background-color: #33adf3;
    border-top-left-radius: 0.1rem;
    border-bottom-left-radius: 0.1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.7em;
}

.mobile-input input {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.block-label {
    width: 100%;
    padding: 0.15rem 0;
}

.radio-option {
    display: flex;
    width: 38%;
}

.radio-option input {
    -webkit-appearance: none;
    width: 0;
    height: 0;
    display: none;
    border: none;
    padding: 0;
}

.radio-ui {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: white;
    width: 0.45rem;
    height: 0.45rem;
    border: 0.08rem solid white;
    margin-right: 0.2rem;
}

.radio-option label {
    display: flex;
    align-items: center;
    flex-grow: 1;
    height: 1.4rem;
}

input[type="radio"]:checked + label .radio-ui {
    background: #33adf3;
}

.btn {
    text-align: center;
    margin-bottom: 4%;
}

.submit_btn {
    outline: none;
    font-size: 0;
    border: none;
    border-radius: 5px;
    width: 50%;
    height: 1.2rem;
    background: url(../../images/ugc_sign/submit.png) no-repeat center;
    background-size: contain;
}

input.has-error {
    background-image: url(../../images/ugc_sign/error.png);
    background-repeat: no-repeat;
    background-position: right center;
    background-origin: content-box;
    background-size: 0.5rem;
}

.gender {
    margin: -0.2rem 0;
}
</style>