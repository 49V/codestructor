import React, {Component} from 'react';
import Blockly from 'node-blockly/browser'; 

import { Block, Category } from 'react-blockly-drawer';
const blockCategories = ['colour', 'lists', 'logic', 'loops', 'math', 'procedures', 'texts', 'variables'];

class Library extends Component {
  


  render() {
    const blocks = Object.keys(Blockly.Blocks).map((t) => { 
      if (blockCategories.includes(t)) {
        return 
      } else {
        return (<Block type={t}/>)
      }
    })
    
    return(
      <Category name='Library' colour={270} >
        <Category name='Colours' colour={'#a5745b'} > 
          {blocks.slice(1,5)}
        </Category>
        <Category name='Lists' colour={'#745ba5'} >
          {blocks.slice(5, 20)}
        </Category>
        <Category name='Logic' colour={'#5b80a5'} >
          {blocks.slice(20, 32)}
        </Category>
        <Category name='Loops' colour={'#5ba55b'} >
          {blocks.slice(32, 39)}
        </Category>
        <Category name='Math' colour={'#495284'} >
          {blocks.slice(39, 53)}
        </Category>
        <Category name='Text' colour={'#5ba58c'} >
          {blocks.slice(61,80)}
        </Category>
        {/* NOTE THAT PROCEDURES AND TEXTS ARE LEFT OUT */}
        <Category name='Variables' colour={'#a55b80'} >
          <Category name= 'New' custom='VARIABLE' />
          {blocks.slice(81, 85)}
        </Category>
      </Category>
    )
  }
}

export default Library