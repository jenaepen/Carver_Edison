/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import CurrencyFormat from "react-currency-format";

/***
 * Budget class receives the name of the user from the props
 * The class manages the following state:
 * - name (provided from the props)
 * - salary (salary value in Currency format)
 * - salaryVal (salary value in Number format)
 * - percent (percentage of salary the user wants to use Number format)
 * - election (indicates if the user is done setting the percentage and salary Boolean format)
 *
 * The class has 3 methods besides render
 * - setSalary (sets the salary and salaryVal)
 * - setPercent (set the user percentage)
 * - submit (set the election to true)
 *
 * render method:
 * sets the current expense = salaryVal/12 * percent/100
 * sets the current savings = salaryVal/12 * (1-percent/100)
 *  The following is returned:
 *  if the election is false, the following is visible
 *    - Welcome to your monthly budget [name]
 *    - input range slider where min = 0 max = 30 (it invokes setPercent)
 *    - [percent]
 *    - [salary] as an input (it invokes setSalary)
 *    - submit button (it invokes submit)
 *  else
 *    - Thank You [name]
 *    - Your Election [percent]
 *    - [salary] as a text
 *
 *  The following is always visible
 *    - Your Salary [salary]
 *    - Your Expense [expense] (from render)
 *    - Your Savings [savings] (from render)
 */
class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      salary: 100000,
      salaryVal: 100000,
      percent: 0,
      election: false
    };

    this.setSalary = this.setSalary.bind(this);
    this.setPercent = this.setPercent.bind(this);
    this.submit = this.submit.bind(this);
  }

  setSalary(values) {
    const { formattedValue, value } = values;
    this.setState({ salary: formattedValue, salaryVal: value });
  }

  setPercent(e) {
    this.setState({ percent: e.target.value });
  }

  submit() {
    this.setState({ election: true });
  }

  render() {
    let expense = (this.state.salaryVal / 12) * (this.state.percent / 100);
    let savings = (this.state.salaryVal / 12) * (1 - this.state.percent / 100);

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
            value={expense}
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
            value={savings}
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
