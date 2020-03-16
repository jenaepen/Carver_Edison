import React, { Component } from "react";
import CurrencyFormat from "react-currency-format";

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      salary: 100000,
      salaryVal: 100000,
      expense: "",
      percent: 0,
      savings: "",
      election: false
    };

    this.setSalary = this.setSalary.bind(this);
    this.setExpenseAndSavings = this.setExpenseAndSavings.bind(this);
    this.setPercent = this.setPercent.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.setExpenseAndSavings();
  }

  setSalary(values) {
    const { formattedValue, value } = values;
    this.setState({ salary: formattedValue, salaryVal: value });
    this.setExpenseAndSavings();
  }

  setExpenseAndSavings() {
    let newValue = (this.state.salaryVal / 12) * (this.state.percent / 100);
    let savings = (this.state.salaryVal / 12) * (1 - this.state.percent / 100);

    this.setState({
      expense: newValue,
      savings: savings
    });
  }

  setPercent(e) {
    this.setState({
      percent: e.target.value
    });
    this.setExpenseAndSavings();
  }

  submit() {
    this.setState({ election: true });
  }

  render() {
    return (
      <div className="center col">
        {!this.state.election ? (
          <div className="visible">
            <h3>Welcome to your monthly budget {this.state.name} </h3>

            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={this.state.percent}
              onChange={this.setPercent}
            />
            <p>{this.state.percent + "%"}</p>
          </div>
        ) : (
          <div className="visible">
            <h4>Thank You {this.state.name} </h4>

            <span className="form">
              <label>Your Election</label>

              <p>{this.state.percent + "%"}</p>
            </span>
          </div>
        )}

        <br />

        <span className="form">
          <label>Your Salary</label>
          {!this.state.election ? (
            <CurrencyFormat
              value={this.state.salary}
              thousandSeparator={true}
              prefix={"$"}
              displayType="input"
              decimalScale={2}
              fixedDecimalScale={true}
              onValueChange={this.setSalary}
            />
          ) : (
            <CurrencyFormat
              value={this.state.salary}
              thousandSeparator={true}
              prefix={"$"}
              displayType="text"
              decimalScale={2}
              fixedDecimalScale={true}
              onValueChange={this.setSalary}
            />
          )}
        </span>

        <br />

        <span className="form">
          <label>Your Expense</label>
          <CurrencyFormat
            value={this.state.expense}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </span>

        <br />
        <span className="form">
          <label>Your Savings</label>
          <CurrencyFormat
            value={this.state.savings}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </span>
        {!this.state.election ? (
          <button onClick={this.submit}>Submit</button>
        ) : null}
      </div>
    );
  }
}
export default Budget;
