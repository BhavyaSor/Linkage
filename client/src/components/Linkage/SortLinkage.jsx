import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  IconButton,
  Popover,
  ListItem,
  Box,
  makeStyles,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import { sortLinkages } from '../../redux/actions';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  leftGroup: {
    marginRight: theme.spacing(3),
  },
}));

const SortLinkage = (props) => {
  const [sortConfig, setSortConfig] = useState({ by: 'dateadded', order: 1 });
  const [anchorMenu, setAnchorMenu] = useState(null);

  const dispatch = useDispatch();
  const css = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(sortLinkages(sortConfig.by, sortConfig.order));
  }, [sortConfig]);

  const handleMenuClose = () => {
    setAnchorMenu(null);
  };
  const handleMenuOpen = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  return (
    <>
      <Tooltip title="Sort Linkages">
        <IconButton onClick={handleMenuOpen}>
          <SortIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Popover
        id="sortOptions"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={handleMenuClose}
      >
        <ListItem>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={css.root}
          >
            <ToggleButtonGroup
              value={sortConfig.by}
              exclusive
              orientation={isSmall ? 'vertical' : 'horizontal'}
              onChange={(e, val) =>
                setSortConfig((state) => ({ ...state, by: val }))
              }
              className={css.leftGroup}
            >
              <ToggleButton value="name" size="small">
                Name
              </ToggleButton>
              <ToggleButton value="dateadded" size="small">
                Date Added
              </ToggleButton>
              <ToggleButton value="datemodified" size="small">
                Date Modified
              </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              value={sortConfig.order}
              exclusive
              orientation={isSmall ? 'vertical' : 'horizontal'}
              onChange={(e, val) =>
                setSortConfig((state) => ({ ...state, order: val }))
              }
            >
              <ToggleButton value={1} size="small">
                <ArrowUpwardIcon />
              </ToggleButton>
              <ToggleButton value={-1} size="small">
                <ArrowDownwardIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </ListItem>
      </Popover>
    </>
  );
};

export default SortLinkage;
