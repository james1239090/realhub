import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class Order extends React.Component {
  static propTypes = {
    orders: PropTypes.array
  };
  static defaultProps = {
    orders: []
  };

  handleCellClick = (item_id, status) => {

  }
  render() {
    const { orders } = this.props;

    return (
      <Wrapper>
        {orders.map((order, i) => {
          return (
            <Card>
              <Header>
                <span>{order.agency.title}</span> -
                <span>{order.campaign.street_number}</span>
                <span>{order.campaign.street_name}</span>,
                <span>{order.campaign.suburb_name}</span>
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
                          <a href={downloadLink}> Download ArtWork</a>
                        </Url>
                        <ChangeStatus>
                          <a href="#" 
                          onClick= {this.handleChangeStatusClick}>Change Status</a>
                        </ChangeStatus>
                        <Status> {item.status_id} </Status>
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
`;

const Status = styled.span`
  float: left;
  width: 1rem;
`;

const ChangeStatus = styled.span`
  float: left;
  width: 8rem;
`;
const Url = styled.span`
  float: left;
  width: 10rem;
`
