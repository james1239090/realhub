import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import FontAwesome from 'react-fontawesome';
import 'react-select/dist/react-select.css';
import 'font-awesome/css/font-awesome.css';
export default class Order extends React.Component {
  static propTypes = {
    orders: PropTypes.array,
    statuses: PropTypes.array,
    onClickChangeStatus: PropTypes.func
  };
  static defaultProps = {
    orders: [],
    statuses: [],
    onClickChangeStatus: () => {}
  };
  getStatusIdToName(id) {
    const { statuses } = this.props;
    const name = _.find(statuses, { value: id }) || {};
    return name.label;
  }

  render() {
    const { orders, onClickChangeStatus } = this.props;
    return (
      <Wrapper>
        {orders.map(order => {
          return (
            <Card key={order.id}>
              <Header>
                <Title>{order.agency.title}</Title>
                <Address>
                  {order.campaign.street_number +
                    ' ' +
                    order.campaign.street_name +
                    ' ' +
                    order.campaign.suburb_name}
                </Address>
              </Header>
              <Body>
                {order.items.map(item => {
                  const downloadLink = item.artwork
                    ? item.artwork.links.download_url
                    : undefined;
                  const statusName =
                    this.getStatusIdToName(item.status_id) || '';
                  const order_id = order.id;
                  const item_id = item.id;
                  const status_id = item.status_id;
                  return (
                    <Item key={item.id}>
                      <span>{item.title}</span>
                      <span>{item.options_string}</span>
                      <Actions>
                        <Url>
                          {downloadLink && (
                            <a href={downloadLink}>
                              <FontAwesome name="file-pdf-o" />
                            </a>
                          )}
                        </Url>
                        <ChangeStatus>
                          <span
                            onClick={() =>
                              onClickChangeStatus({
                                order_id,
                                item_id,
                                status_id
                              })
                            }>
                            <FontAwesome name="pencil-square-o" />
                          </span>
                        </ChangeStatus>
                        <Status statusName={statusName}>{statusName}</Status>
                      </Actions>
                    </Item>
                  );
                })}
              </Body>
            </Card>
          );
        })}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  padding: 4em;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin: 1.5rem;
`;

const Header = styled.div`
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`;

const Title = styled.label`
  font-weight: bold;
`;

const Address = styled.address`
  margin-left: 5px;
  display: inline-block;
  color: #868e96;
  font-size: 11px;
`;

const Body = styled.div`
  flex: 1 1 auto;
  padding: 1.25rem;
`;

const Item = styled.div`
  padding: 0.15rem 0.25rem;
  width: 100%;
  display: flex;
  align-item: center;
`;

const Actions = styled.div`
  float: right;
  width: 190px;
  margin-left: auto;
`;

const ActionDiv = styled.div`
  float: left;
  text-align: right;
`;

const ChangeStatus = ActionDiv.extend`
  width: 50px;
  text-align: right;
`;

const Url = ActionDiv.extend`
  width: 50px;
  min-height: 13px;
`;
const Status = ActionDiv.extend`
  width: 90px;
  color: ${props => {
    switch (props.statusName) {
      case 'Pending': {
        return '#868e96';
        break;
      }
      case 'Approved': {
        return '#28a745';
        break;
      }
      case 'Processing': {
        return '#ffc107';
        break;
      }
      case 'Printed': {
        return '#007bff';
        break;
      }
      case 'Packaged': {
        return '#17a2b8';
        break;
      }
      case 'Declined': {
        return '#dc3545';
        break;
      }
      default: {
        return '#0c5460';
        break;
      }
    }
  }};
`;
