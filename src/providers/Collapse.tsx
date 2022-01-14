import { Component } from 'react';

interface IProps {
  isCollapsed: boolean;
}

export interface IRenderProps extends IProps {
  toggle: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Collapse extends Component<IProps | any> {
  constructor(props: IProps) {
    super(props);
    this.state = { isCollapsed: false };
  }

  toggle = () => {
    this.setState((prevState: IProps) => ({
      isCollapsed: !prevState.isCollapsed
    }));
  };

  render() {
    const { isCollapsed } = this.state as IProps;
    const renderProps = {
      isCollapsed,
      toggle: this.toggle
    };

    return this.props.render(renderProps);
  }
}

export default Collapse;
