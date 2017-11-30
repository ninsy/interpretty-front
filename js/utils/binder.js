class Binder {
  constructor(form) {
    this.form = form;
  }

  bindInput = (id) => ({
    value: this.form.$(id).value,
    label: this.form.$(id).label,
    error: this.form.$(id).error,
    onBlur: this.form.$(id).onBlur,
    onChange: this.form.$(id).onChange,
    onFocus: this.form.$(id).onFocus,
  })
}

export default Binder;
