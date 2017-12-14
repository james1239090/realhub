import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import FontAwesome from 'react-fontawesome';
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

  handleClickChangeStatus = (order_id, item_id, status_id) => {
    const { onClickChangeStatus } = this.props;
    onClickChangeStatus({ order_id, item_id, status_id });
  };

  getStatusIdToName = id => {
    const { statuses } = this.props;

    const name = _.find(statuses, ['value', id]) || {};
    return name.label;
  };

  render() {
    const { orders, onClickChangeStatus } = this.props;
    return (
      <Wrapper>
        {orders.map((order, i) => {
          return (
            <Card>
              <Header>
                <Title>{order.agency.title}</Title>
                <Address>{order.campaign.street_number}</Address>
                <Address>{order.campaign.street_name}</Address>
                <Address>{order.campaign.suburb_name}</Address>
              </Header>
              <Body>
                {order.items.map((item, i) => {
                  let downloadLink = item.artwork
                    ? item.artwork.links.download_url
                    : undefined;
                  return (
                    <Item>
                      <span>{item.title}</span>
                      <span>{item.options_string}</span>

                      <DivRight>
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
                              this.handleClickChangeStatus(
                                order.id,
                                item.id,
                                item.status_id
                              )
                            }>
                            <FontAwesome name="pencil-square-o" />
                          </span>
                        </ChangeStatus>
                        <Status>
                          {this.getStatusIdToName(item.status_id)}
                        </Status>
                      </DivRight>
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

const Address = styled.label`
  margin-left: 5px;
  color: #868e96;
  font-size: 11px;
`

const Body = styled.div`
  flex: 1 1 auto;
  padding: 1.25rem;
`;

const Item = styled.div`
  display: inline-block;
  padding: 0.15rem 0.25rem;
  width: 100%;
`;

const DivRight = styled.div`
  float: right;
  width: 190px;
`;

const ActionDiv = styled.div`
  float: left;
  text-align: right;
`;

const Status = ActionDiv.extend`
  width: 90px;
`;

const ChangeStatus = ActionDiv.extend`
  width: 50px;
  text-align: right;
`;

const Url = ActionDiv.extend`
  width: 50px;
  min-height: 13px;
`;
