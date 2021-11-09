import React from 'react';
import clsx from 'clsx';
import { darken, makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import { availableColors } from '../../shared/misc';

const useStyles = (pickColor, darkColor) =>
  makeStyles({
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    icon: {
      borderRadius: 3,
      width: 24,
      height: 24,
      backgroundColor: pickColor,
      'input:hover ~ &': {
        transform: 'scale(1.25)',
      },
    },
    checkedIcon: {
      transform: 'scale(1.25)',
      backgroundColor: pickColor,
      border: `2px solid ${darkColor}`,
      '&:before': {
        display: 'block',
        width: 24,
        height: 24,
        content: '""',
      },
    },
  });

const StyledRadio = (props) => {
  const pickColor = props.pickColor;
  const classes = useStyles(pickColor, darken(pickColor, 0.75))();
  return (
    <Radio
      className={classes.root}
      disableRipple
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
};

const ColoredRadioGrp = (props) => {
  return (
    <Box style={{ marginTop: 24, marginBottom: 24 }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Choose color</FormLabel>
        <RadioGroup
          row
          aria-label="colorRadio"
          name="customized-radios"
          onChange={(e, val) => props.setColor('color', val)}
        >
          {availableColors.map((color, idx) => (
            <StyledRadio
              checked={color === props.color}
              pickColor={color}
              key={idx}
              value={color}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default ColoredRadioGrp;
