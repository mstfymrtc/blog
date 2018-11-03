import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
//reduxForm, connecte benzer iş yapıyor.

class PostsNew extends Component {
  renderTitleField(field) {
    //field argümanı, Field'ın 2 alt satırdaki input'tan sorumlu olduğunu haber etmek için önemli.
    return (
      <div className="form-group">
        <label>Title</label>
        <input className="form-control" type="text" {...field.input} />
      </div>
    );
  }

  render() {
    return (
      <form>
        <Field name="title" component={this.renderTitleField} />
        {/* name kısmı, hangi state i düzenliyorsak onu yazdığımız kısım. (burada postun title ı) */}
        <Field name="tags" component={this.renderTagsField} />
        {/* componente bir fonksiyona referans veriyoruz. */}
      </form>
    );
  }
}

//reduxForm'un yaptığı, bu componenti sarmak.
//böylelikle, reduxForm'a bu componentten
//reducer'a direkt erişim yeteneği veriyoruz.
export default reduxForm({
  form: "PostsNewForm"
  //PostsNewForm bu sayfadaki form. Tek
  //sayfada birden fazla form olabilir,
  //ve bu form ismi unique olmalı.
})(PostsNew);
