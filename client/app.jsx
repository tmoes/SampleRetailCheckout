// Main app comp ---------------------------------------------------
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      password: null,
      addressLine1: null,
      addressLine2: null,
      city: null,
      zipCode: null,
      phoneNumber: null,
      creditCardNumber: null,
      expirationDate: null,
      cvv: null,
      billingZipCode: null,
      checkoutPage: true,
      form1Page: false,
      form2Page: false,
      form3Page: false,
      confirmationPage: false,
      purchasedPage: false
    };

    this.checkout = this.checkout.bind(this);
    this.form1Page = this.form1Page.bind(this);
    this.form2Page = this.form2Page.bind(this);
    this.form3Page = this.form3Page.bind(this);
    this.purchasedPage = this.purchasedPage.bind(this);
    this.homePage = this.homePage.bind(this);
  };

  checkout() {
    this.setState( {
        checkoutPage: false,
        form1Page:true
      } );
  };

  form1Page(data) {
    for (let key in data) {
      this.setState( {
          [key]: data[key]
        } );
    }
    this.setState( {
        form1Page: false,
        form2Page: true
      } );
  };

  form2Page(data) {
    for (let key in data) {
      this.setState( {
          [key]: data[key]
        } );
    }
    this.setState( {
        form2Page: false,
        form3Page: true
      } );
  };

  form3Page(data) {
    for (let key in data) {
      this.setState( {
          [key]: data[key]
        } );
    }
    this.setState( {
        form3Page: false,
        confirmationPage: true
      } );
  };

  purchasedPage() {
    // let data = this.state;
    // console.log('data = this.state:___________________');
    // console.log(data);
    let data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      addressLine1: this.state.addressLine1,
      addressLine2: this.state.addressLine2,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      phoneNumber: this.state.phoneNumber,
      creditCardNumber: this.state.creditCardNumber,
      expirationDate: this.state.expirationDate,
      cvv: this.state.cvv,
      billingZipCode: this.state.billingZipCode
    }
    axios.post('http://localhost:3000/purchasePage', data)
      .then( data => {
        console.log('Successful axios post', data);
        this.setState ( {
          confirmationPage: false,
          purchasedPage: true
        })
      })
      .catch( err => {
        console.log('Unsuccessful axios post', err);
      });
  }

  homePage() {
    this.setState( {
      purchasedPage: false,
      checkoutPage: true
    } );
  }

  render() {
    return (
      <div id="App">
          {this.state.checkoutPage ? <CheckoutPage nextPage={this.checkout} /> : null}
          {this.state.form1Page ? <Form1Page nextPage={this.form1Page} /> : null}
          {this.state.form2Page ? <Form2Page nextPage={this.form2Page} /> : null}
          {this.state.form3Page ? <Form3Page nextPage={this.form3Page} /> : null}
          {this.state.confirmationPage ? <PurchasePage nextPage={this.purchasedPage} data={this.state} /> : null}
          {this.state.purchasedPage ? <HomePage nextPage={this.homePage} /> : null}
      </div>
    )
  }
}

// CheckoutPage Comp  ----------------------------------------------
class CheckoutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <button onClick={this.props.nextPage}>Checkout Now</button>
  }
}

// Form1Page Comp --------------------------------------------------
class Form1Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState( {
      [e.target.id]: e.target.value
    });
  }

  onSubmit(e) {
    this.props.nextPage(this.state);
  }

  render() {
    return (
      <div>
        <h2>Form1Page - Name, Email, Password</h2>
        <br></br>
        <form onSubmit={this.onSubmit}>
          <label>First and Last Name:
            <input id="name" type="text" onChange={this.onChange} value={this.state.name} />
          </label>
          <br></br>
          <label>Email-----------------:
            <input id="email" type="text" onChange={this.onChange} value={this.state.email} />
          </label>
          <br></br>
          <label>Password-------------:
            <input id="password" type="text" onChange={this.onChange} value={this.state.password} />
          </label>
          <br></br>
          <button type="button" onClick={this.onSubmit}>Proceed to Shipping Details</button>
        </form>
      </div>
    )
  }
}

// Form2Page Comp --------------------------------------------------
class Form2Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState( {
      [e.target.id]: e.target.value
    });
  }

  onSubmit(e) {
    this.props.nextPage(this.state);
  }

  render() {
    return (
      <div>
        <h2>Form2Page - Address, Phone</h2>
        <br></br>
        <form onSubmit={this.onSubmit}>
          <label>Street Address - Line 1:
            <input id="addressLine1" type="text" onChange={this.onChange} value={this.state.addressLine1} />
          </label>
          <br></br>
          <label>Street Address - Line 2:
            <input id="addressLine2" type="text" onChange={this.onChange} value={this.state.addressLine2} />
          </label>
          <br></br>
          <label>City:
            <input id="city" type="text" onChange={this.onChange} value={this.state.city} />
          </label>
          <br></br>
          <label>State:
            <input id="state" type="text" onChange={this.onChange} value={this.state.state} />
          </label>
          <br></br>
          <label>Zip Code:
            <input id="zipCode" type="text" onChange={this.onChange} value={this.state.zipCode} />
          </label>
          <br></br>
          <label>Phone Number:
            <input id="phoneNumber" type="text" onChange={this.onChange} value={this.state.phoneNumber} />
          </label>
          <br></br>
          <button type="button" onClick={this.onSubmit}>Proceed to Credit Card Details</button>
        </form>
      </div>
    )
  }
}

// Form3Page comp --------------------------------------------------
class Form3Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      creditCardNumber: '',
      expirationDate: '',
      cvv: '',
      billingZipCode: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState( {
      [e.target.id]: e.target.value
    });
  }

  onSubmit(e) {
    this.props.nextPage(this.state);
  }

  render() {
    return (
      <div>
        <h2>Form3Page - Credit Card #, Expiration Date, CVV, Billing Zip Code</h2>
        <br></br>
        <form onSubmit={this.onSubmit}>
          <label>Credit Card #:
            <input id="creditCardNumber" type="text" onChange={this.onChange} value={this.state.creditCardNumber} />
          </label>
          <br></br>
          <label>Expiration Date:
            <input id="expirationDate" type="text" onChange={this.onChange} value={this.state.expirationDate} />
          </label>
          <br></br>
          <label>CVV:
            <input id="cvv" type="text" onChange={this.onChange} value={this.state.cvv} />
          </label>
          <br></br>
          <label>Billing Zip Code:
            <input id="billingZipCode" type="text" onChange={this.onChange} value={this.state.billingZipCode} />
          </label>
          <br></br>
          <button type="button" onClick={this.onSubmit}>Confirm Purchase Details</button>
        </form>
      </div>
    )
  }
}

// purchasedPage comp -----------------------------------------------
class PurchasePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Confirm Purchase Details</h2>
        <br></br>
        <li>Name:             {this.props.data.name}</li>
        <li>Email:            {this.props.data.email}</li>
        <li>Password:         {this.props.data.password}</li>
        <br></br>
        <li>Shipping Address: {this.props.data.addressLine1}</li>
        <li>Shipping Address: {this.props.data.addressLine2}</li>
        <li>City:             {this.props.data.city}</li>
        <li>Zip Code:         {this.props.data.zipCode}</li>
        <li>Phone Number:     {this.props.data.phoneNumber}</li>
        <br></br>
        <li>Credit Card #:    {this.props.data.creditCardNumber}</li>
        <li>Expiration Date:  {this.props.data.expirationDate}</li>
        <li>CVV:              {this.props.data.cvv}</li>
        <li>Billing Zip Code: {this.props.data.billingZipCode}</li>
        <br></br>
        <button type="button" onClick={this.props.nextPage}>Complete Purchase</button>
      </div>
    )
  }
}

// Homepage comp ([purchase complete]) -----------------------------
class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Purchase Complete.</h2>
        <h3>Thank you for shopping with us!</h3>
        <button type="button" onClick={this.props.nextPage}>Continue Shopping</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));