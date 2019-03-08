import React, {Component} from 'react';
import Blockly from 'node-blockly/browser'; 

import BlocklyDrawer, { Block, Category } from 'react-blockly-drawer';

class Workspace extends Component {

  render() {
    return (
      <BlocklyDrawer
        onChange={(code, workspace) => {
          console.log(code);
          console.log(workspace);
          // if (eval(code) === 1) {
          //   alert("Got it!");
          // }
        }}
      >

        <Category name="Variables" custom="VARIABLE" />
        <Category name="Values">
          <Block type="math_number" />
          <Block type="text" />
        </Category>
 
      </BlocklyDrawer>
    );
  }
}

export default Workspace