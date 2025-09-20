import React from 'react';
import EmptySlot from './EmptySlot';
import BlockElement from './BlockElement';

const Grid = ({state, grid_name, disabled}) => {
    const cols = state[0]?.length || 0;
    const style = {
        gridTemplateColumns: `repeat(${cols}, 1fr)`, 
    }
    return (
        <div className={"grid aspect-square w-[90vw] sm:w-[45vw] sm:h-[45vw]"} style={style}>
            {state.flat().map((block, idx) => {
                const i = Math.floor(idx/cols);
                const j = idx % cols;
                
                return  (
                    <EmptySlot key={`${grid_name}_slot_${i}${j}`} id={`${grid_name}_slot_${i}${j}`} className="aspect-square gap-0">
                        {
                            block ? 
                            (
                                <BlockElement
                                    disabled={disabled}
                                    id = {block.bid}
                                    {...block}
                                />
                            ) 
                            : null
                        }
                    </EmptySlot>
                )
            })}
        </div>
            
    );
};

export default Grid;
