import { SelectField, TextField, Button, Paper, Checkbox } from 'react-md';
import React from 'react';

const template = data =>
`@structured

**Price** $${data.price.toFixed(2)}

**Description** ${data.description}

**Type** ${data.type}

**Category** ${data.category}

**Currency** ${data.currency.split(/\s/).filter(c => c).join(' ')}

**Tracking** ${data.tracking}

**NSFW** ${data.nsfw}

**Autobuy** ${data.autobuy}

${data.tracking ?
`**Addresses** ${data.addresses.split(/\s/).filter(c => c).join(' ')}`
: ''}

${data.images ?
  `**Images** ${data.images.split(/\s/).filter(c => c).join(' ')}`
  : ''}
`;

export default class XyfirMarketForm extends React.Component {

  constructor(props) {
    super(props);

    this.i = {}; // input component refs
  }

  onPost() {
    const text = template({
      nsfw: window['checkbox--nsfw'].checked,
      type: this.i.type.value,
      price: +this.i.price.value,
      images: this.i.images.value,
      autobuy: window['checkbox--autobuy'].checked,
      currency: this.i.currency.value,
      category: this.i.category.value,
      tracking: window['checkbox--tracking'].checked,
      addresses: this.i.addresses.value,
      description: this.i.description.value
    });

    window.open(
      `https://www.reddit.com/r/xyMarket/submit` +
      `?title=${encodeURIComponent(this.i.title.value)}` +
      `&text=${encodeURIComponent(text)}`
    );
  }

  render() {
    return (
      <div className='xyfir-market-form-builder'>
        <h2>Post to xyMarket</h2>
        <p>
          Use this form to build a structured sales thread for xyMarket. Check the <a href='https://github.com/Xyfir/Documentation/blob/master/xyfir-market/sellers.md' target='_blank'>seller documentation</a> for more information about each field.
        </p>
        <p>
          <strong>Warning!</strong> Currently, this form does not validate the data you provide, so you will not know if it is correct until xyMarketBot validates your post.
        </p>

        <Paper
          zDepth={1}
          component='section'
          className='form section flex'
        >
          <h3>Required Fields</h3>

          <TextField
            id='text--title'
            ref={i => this.i.title = i}
            type='text'
            label='Title'
            className='md-cell'
            defaultValue='Structured Sales Thread'
          />

          <SelectField
            id='select--type'
            ref={i => this.i.type = i}
            label='Type'
            menuItems={[
              'Digital Item', 'Digital Service',
              'Physical Item', 'Physical Service'
            ]}
            className='md-cell'
            defaultValue='Digital Item'
          />

          <SelectField
            id='select--category'
            ref={i => this.i.category = i}
            label='Category'
            menuItems={[
              'Advertising', 'Automotives', 'Books', 'Collectibles',
              'Computers', 'Cryptocurrency', 'Digital Goods', 'Electronics',
              'Entertainment', 'Fashion', 'Fiat', 'Food and Beverage',
              'Home & Garden', 'Industrial', 'NSFW', 'Other', 'Precious Metals',
              'Printed Media', 'Real Estate', 'Services', 'Sports & Hobbies',
              'Vouchers & Gift Cards', 'Web'
            ]}
            className='md-cell'
            defaultValue='Digital Goods'
          />

          <TextField
            id='textarea--description'
            ref={i => this.i.description = i}
            rows={2}
            type='text'
            label='Description'
            className='md-cell'
          />

          <TextField
            id='number--price'
            min={5}
            ref={i => this.i.price = i}
            step={1}
            type='number'
            label='Price (USD)'
            className='md-cell'
            defaultValue='5.00'
          />

          <TextField
            id='text--currency'
            ref={i => this.i.currency = i}
            type='text'
            label='Accepted Currency'
            helpText='Space separated currency identifiers'
            className='md-cell'
            defaultValue='BTC LTC ETH'
          />
        </Paper>

        <Paper
          zDepth={1}
          component='section'
          className='form section flex'
        >
          <h3>Optional Fields</h3>

          <div className='checkboxes'>
            <Checkbox
              inline
              id='checkbox--tracking'
              ref={i => this.i.tracking = i}
              label='Tracking'
            />

            <Checkbox
              inline
              id='checkbox--autobuy'
              ref={i => this.i.autobuy = i}
              label='Autobuy'
            />

            <Checkbox
              inline
              id='checkbox--nsfw'
              ref={i => this.i.nsfw = i}
              label='NSFW'
            />
          </div>

          <TextField
            id='textarea--addresses'
            ref={i => this.i.addresses = i}
            rows={3}
            type='text'
            label='Addresses'
            helpText='Required if Tracking is enabled'
            className='md-cell'
            placeholder={
              'BTC=1YourBitcoinAddressObR76b53LETtpyT\n' +
              'LTC=3YourLitecoinAddressHXHXEeLygMXoAj\n' +
              'ETH=0xYourEthereumAddress32487E1EfdD8729b87445'
            }
          />

          <TextField
            id='textarea--images'
            ref={i => this.i.images = i}
            rows={2}
            type='text'
            label='Images'
            className='md-cell'
            placeholder={
              'http://i.imgur.com/XXXXXXXXXXXXXX.jpg\n' +
              'https://i.imgur.com/XXXXXXXXXXXXXZ.png'
            }
          />
        </Paper>

        <Button
          raised primary
          onClick={() => this.onPost()}
        >Submit</Button>
      </div>
    );
  }

}