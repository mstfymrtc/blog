//TODO:redux form, sadece formun state'inden ve validationundan sorumlu.
//gelen cevabı istek atma vs'dan sorumlu değil.

import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
//reduxForm, connecte benzer iş yapıyor.
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions/";
class PostsNew extends Component {
  /*has-danger: inputu kırmızı yapar
text-help: yazıyı kırmızı yapar*/

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />

        <div className="text-help">
          {/* //sadece inputa focuslu isek hatayı göstermek: */}
          {touched ? error : ""}
          {/* aşağıdaki validate fonksiyonundan gelen errors */}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    //TODO: BURASI ÇOK ÖNEMLİ! POST İSTEĞİ 201 OLARAK GELİRSE
    //NAVIGATE EDECEĞİZ. BUNUN İÇİN CALLBACK KULLANIYORUZ.
    //ACTIONA HISTORY.PUSH FONKSOYNUNU GÖNDERİYORUZ.
    //EĞER İSTEK BAŞARILIYSA, ACTION, BU FONKSIYONU ÇALIŞTIRACAK.
    this.props.createPost(values, () => this.props.history.push("/"));
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      //aşağıdaki satırda redux-form'dan gelen handleSubmit fonksiyonu,
      //ona verilen fonksiyonu çalıştırmadan çnce çalışarak formda her şey tamam mı
      //kontrol eder. eğer her şey tamamsa içindeki fonksiyonu çalıştırır
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        {/* //TODO:onSubmit fonksiyonu içinde this. kullanacağımız için BIND ettik!!! */}

        {/* TODO:Field'a geçilen proplar, yukarıdaki renderField fonksiyonundaki
        field parametresinden erişilebilir. örn:field.label şeklinde. */}
        <Field name="title" label="Title" component={this.renderField} />
        {/* name kısmı, hangi state i düzenliyorsak onu yazdığımız kısım. (burada postun title ı) */}
        <Field
          name="categories"
          label="Categories"
          component={this.renderField}
        />
        {/* componente bir fonksiyona referans veriyoruz. */}

        <Field
          name="content"
          label="Post Content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        {/* //link, <a tag olarak render edilir. */}
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  // console.log(values) -> {title:"dfdas",categories:"hkgs",content:"sdfakgf"}

  const errors = {};

  //validate the inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title!";
  }

  if (!values.categories) {
    errors.categories = "Enter a category!";
  }

  if (!values.content) {
    errors.content = "Enter a content!";
  }
  //if errors is empty, the form is fine to submit
  //if errors has any properties, redux form assumes form is invalid
  return errors;
}

//reduxForm'un yaptığı, bu componenti sarmak.
//böylelikle, reduxForm'a bu componentten
//reducer'a direkt erişim yeteneği veriyoruz.
export default reduxForm({
  validate,
  form: "PostsNewForm"
  //PostsNewForm bu sayfadaki form. Tek
  //sayfada birden fazla form olabilir,
  //ve bu form ismi unique olmalı.
})(
  connect(
    null,
    { createPost }
  )(PostsNew)
);
