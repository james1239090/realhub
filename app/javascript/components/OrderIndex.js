import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Order from './Order';
import Modal from 'react-modal';
import SelectDefault from 'react-select';

export default class OrderIndex extends React.Component {
  static propTypes = {
    orders: PropTypes.array
  };
  static defaultProps = {
    orders: []
  };
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      statuses: [],
      itemStatus: {
        id: '',
        status: ''
      }
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      itemStatus: {
        id: '',
        status: ''
      }
    });
  }

  handleClickChangeStatus = ({ id, status }) => {
    this.openModal();
    this.setState({
      itemStatus: {
        id: id,
        status: status
      }
    });
  };
  handleStatusChange = option => {
    let itemStatus = Object.assign({}, this.state.itemStatus);
    itemStatus.status = _.get(option, 'value', null);
    this.setState({
      itemStatus: itemStatus
    });
  };

  getStatuses = () => {
    fetch(`/statuses.json`).then(response =>
      response.json().then(data => {
        const statues = data.map((value, i) => {
          return {
            value: value.id,
            label: value.title
          };
        });
        this.setState({
          statuses: statues
        });
      })
    );
  };

  handleUpdateStatus = item => {
    const token = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');
    const status = this.getStatusIdToName(item.status);
 
    fetch(`/order_items/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
      },
      body: JSON.stringify({
        status: status
      })
    }).then(response => response.json());
  };
  getStatusIdToName = id => {
    const { statuses } = this.state;

    const name = _.find(statuses, ['value', id]) || {};
    return name.label;
  };
  componentWillMount = () => {
    this.getStatuses();
  };
  render() {
    const { orders } = this.props;
    const { statuses, itemStatus } = this.state;
    return (
      <div>
        <Order
          orders={orders}
          onClickChangeStatus={this.handleClickChangeStatus}
          statuses={statuses}
        />
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customModalStyles}
          contentLabel="Change Status Modal">
          <Form>
            <Row>
              <h3>Change Status</h3>
            </Row>
            <Row>
              <Select
                name="form-field-name"
                value={itemStatus.status}
                multi={false}
                onChange={this.handleStatusChange}
                options={statuses}
              />
            </Row>
            <Row align="center">
              <CancelButton onClick={this.closeModal}>Close</CancelButton>
              <EditButton
                onClick={this.handleUpdateStatus.bind(this, itemStatus)}>
                Update
              </EditButton>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #ccc',
    height: '35%',
    width: '25%'
  }
};
const Select = styled(SelectDefault)`
  width: 180px;
`;
const Form = styled.form`
  display: table;
  margin: 0 auto;
  position: relative;
`;
const Row = styled.div`
  align-items: center;
  display: flex;
  min-height: 50px;
  &:last-child {
    text-align: center;
    padding: 20px 0;
  }
`;
const Button = styled.button.attrs({ type: 'button' })`
  border-radius: 3px;
  border: 1px solid #466d1d;
  box-sizing: border-box;
  color: #fff;
  min-width: 90px;
  padding: 12px;
  margin: 0 4px 0 0;
`;

const CancelButton = styled(Button)`
  background-color: #868e96;
  border-color: #868e96;
`;
const EditButton = styled(Button)`
  background-color: #28a745;
  border-color: #28a745;
`;