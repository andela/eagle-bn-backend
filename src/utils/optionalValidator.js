/* eslint-disable no-useless-escape */


/* eslint-disable require-jsdoc */

const validate = {
  obj(data) {
    this.key = Object.keys(data);
    this.val = Object.values(data)[0].body[this.key];
    this.status = 200;
    this.data = Object.entries(data)[0][1].body;
    this.file = Object.values(data)[0].files;
    return this;
  },
  gender() {
    if (this.val && !this.val.match(/^(Male|Female|MALE|FEMALE|male|female)$/)) {
      throw new Error(`${this.key} is invalid`);
    }
    return this;
  },

  alfaNum() {
    if (this.val && (!this.val.match(/^[a-zA-Z0-9]+$/))) {
      throw new Error(`${this.key} should be alphanumeric`);
    }
    return this;
  },

  alfa() {
    if (this.val && !this.val.match(/^[a-zA-Z]+$/)) {
      throw new Error(`${this.key} should be alphabetic`);
    }
    return this;
  },

  confirm() {
    if (this.val && this.val !== this.data.confirmPassword) {
      throw new Error(`${this.key} provided do not match`);
    }
    return this;
  },

  withSpec() {
    if (this.val && (!this.val.match(/[a-zA-Z0-9]+/) || !this.val.match(/[#*@!&]+/))) {
      throw new Error(`${this.key} should have 1 special character and alphanumeric`);
    }
    return this;
  },
};

export default validate;
