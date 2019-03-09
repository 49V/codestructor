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
      <Category name='Library'>
        <Category name='Colours'> 
          {blocks.slice(1,5)}
        </Category>
        <Category name='Lists'>
          {blocks.slice(5, 20)}
        </Category>
        <Category name='Logic'>
          {blocks.slice(20, 32)}
        </Category>
        <Category name='Loops'>
          {blocks.slice(32, 39)}
        </Category>
        <Category name='Math'>
          {blocks.slice(39, 53)}
        </Category>
        {/* NOTE THAT PROCEDURES AND TEXTS ARE LEFT OUT */}
        <Category name='Variables'>
          <Category name= 'New' custom='VARIABLE' />
          {blocks.slice(81, 85)}
        </Category>
      </Category>
    )
  }
}

export default Library