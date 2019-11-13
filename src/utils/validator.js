/* eslint-disable require-jsdoc */
/* eslint-disable no-prototype-builtins */


class Validate {
  constructor(data) {
    this.key = Object.keys(data);
    this.val = Object.values(data)[0].body[this.key] || Object.values(data)[0].query[this.key];
    this.status = 200;
    this.data = Object.entries(data)[0][1].body;
  }

  str() {
    if (this.val && typeof JSON.stringify(this.val) !== 'string') {
      this.status = 400;
      throw new Error()`${this.key} should be a string`;
    }
    return this;
  }

  array() {
    if (this.val && !(this.val instanceof Array)) {
      this.status = 400;
      throw new Error()`${this.key} should be an array`;
    }
    return this;
  }

  req() {
    if (!this.data.hasOwnProperty(this.key) || !this.val) {
      this.status = 400;
      throw new Error(`${this.key} is required`);
    }
    return this;
  }

  min(len) {
    if (this.val && this.val.length < len) {
      this.status = 400;
      throw new Error(`${this.key} length should be greater than ${len - 1}`);
    }
    return this;
  }

  alpha() {
    if (this.val && (!this.error) && (!this.val.match(/[a-zA-Z]{2,}/))) {
      this.status = 400;
      throw new Error(`${this.key} should be alphabetic and have 2 character minimum`);
    }
    return this;
  }

  num() {
    if (this.val && (!this.error) && (!/^[0-9]{1,}$/.test(this.val))) {
      this.status = 400;
      throw new Error(`${this.key} should be a number`);
    }
    return this;
  }

  integer() {
    if (this.val) {
      this.val = this.val.toString();
      if ((!this.error) && (!this.val.match(/^[0-9]{1,}$/))) {
        this.status = 400;
        throw new Error(`${this.key} should be an integer`);
      }
    }
    return this;
  }

  alphaNum() {
    if (this.val && (!this.val.match(/^[a-zA-Z0-9]+$/))) {
      throw new Error(`${this.key} should be alphanumeric`);
    }
    return this;
  }

  email() {
    if (this.val && (!this.error) && (!this.val.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))) {
      throw new Error(`Invalid ${this.key} address`);
    }
    return this;
  }

  confirm() {
    if (this.val && this.val !== this.data.confirmPassword) {
      throw new Error(`${this.key} provided do not match`);
    }
    return this;
  }

  gender() {
    if (this.val && !this.val.match(/^(Male|Female|MALE|FEMALE|male|female)$/)) {
      this.status = 400;
      throw new Error(`${this.key} is invalid`);
    }
    return this;
  }

  withSpec() {
    // eslint-disable-next-line no-useless-escape
    if (this.val && (!this.val.match(/[a-zA-Z]+/) || this.val.match(/\s+/) || !this.val.match(/[0-9]+/) || !this.val.match(/[-!$%^&*()_+|~=``{}\\:";'<>?,./@]+/))) {
      throw new Error(`${this.key} should contain letters, numbers and  at least 1 special character`);
    }
    return this;
  }

  eql(len) {
    if (this.val && this.val.length !== len) {
      this.status = 400;
      throw new Error(`${this.key} length should equal to ${len}`);
    }
    return this;
  }

  double() {
    if (this.val && (!this.error) && (!/^[0-9]{1,}\.{0,}[0-9]{0,}$/.test(this.val))) {
      this.status = 400;
      throw new Error(`${this.key} should be a positive double number`);
    }
    return this;
  }

  date() {
    if (this.val && !this.val.match(/[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/)) {
      throw new Error(`${this.key} date fomart is invalid try: YYYY-M-D`);
    }
  }

  dateGreaterThan(date) {
    if (this.val && (!this.error) && !(new Date(this.val) > date)) {
      this.status = 400;
      throw new Error(`${this.key} should be a greater than ${new Date(date)}`);
    }
    return this;
  }
}


export default Validate;
