import * as React from 'react';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';

export interface Props {
  placeholder?: string;
  value?: string;
  onSubmit: (query: string) => void;
}

interface State {
  value: string;
}

export class SearchBox extends React.PureComponent<Props> {
  readonly state: State = {
    value: this.props.value || '',
  };

  private inputEl: HTMLInputElement;

  render() {
    const { value } = this.state;

    return (
      <div className="SearchBox">
        <form className="SearchBox-container" onSubmit={this.submit}>
          <Input
            placeholder="Messi"
            value={value}
            onChange={this.updateValue}
            inputRef={el => this.inputEl = el}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
    );
  }

  private updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    this.setState({ value });
  }

  private submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = this.inputEl.value;
    this.props.onSubmit(value);
  }

}
