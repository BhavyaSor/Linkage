import React, { useEffect, useContext } from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import { connect, useSelector } from 'react-redux';
import {
  addLinkage,
  deleteLinkage,
  editLinkage,
  getLinkagePath,
  getLinkages,
  getSharingDetails,
  shareLinkage,
} from '../../redux/actions';
import LinkageToolBar from './ToolBarLinkage';
import LinkageContainer from './ContainerLinkage';
import Information from '../Utils/Information';
import { UtilContext } from '../Utils/UtilContext';

const mapStateToProps = (state) => {
  return {
    linkage: state.linkage,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLinkages: (lid) => dispatch(getLinkages(lid)),
    getLinkagePath: (lid) => dispatch(getLinkagePath(lid)),
    addLinkage: (ldata) => dispatch(addLinkage(ldata)),
    deleteLinkage: (lid) => dispatch(deleteLinkage(lid)),
    editLinkage: (lid, data) => dispatch(editLinkage(lid, data)),
    shareLinkage: (lid, email, operation) =>
      dispatch(shareLinkage(lid, email, operation)),
    getSharingDetails: (lid) => dispatch(getSharingDetails(lid)),
  };
};

const Linkage = (props) => {
  const utils = useContext(UtilContext);
  const notificationRef = utils.notificationRef;
  const user = useSelector((state) => state.user);
  const linkage = useSelector((state) => state.linkage);
  // const l_id = props.match.params.l_id;
  // const linkageArg = l_id === 'my-linkage' ? '' : l_id;
  useEffect(() => {
    document.title = `Linkage - Utility ToolBox`;
  }, []);

  useEffect(() => {
    const l_id = props.match.params.l_id;
    const linkageArg = l_id === 'my-linkage' ? '' : l_id;
    props.getLinkages(linkageArg);
    props.getLinkagePath(linkageArg);
  }, [props.match.params.l_id, user.user]);

  useEffect(() => {
    console.log(linkage.error?.message);
    if (
      linkage.error &&
      linkage.error.status !== 403 &&
      notificationRef.current
    ) {
      console.log('hona to chahie');
      notificationRef.current.notify('error', linkage.error.message);
    }
  }, [linkage.error]);

  return (
    <>
      {linkage.error && linkage.error.status === 403 ? (
        <Information
          message={
            user.user
              ? 'Unauthorized to view this Page'
              : 'Please Login to View'
          }
        />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          flex={1}
          p={2}
        >
          <Box width="100%" p={2}>
            <LinkageToolBar
              parent={props.match.params.l_id}
              addLinkage={props.addLinkage}
            />
          </Box>
          <Box flex={5} p={2} width="100%">
            <LinkageContainer
              deleteLinkage={props.deleteLinkage}
              getSharingDetails={props.getSharingDetails}
              editLinkage={props.editLinkage}
              shareLinkage={props.shareLinkage}
              routerHistory={props.history}
              getLinkages={props.getLinkages}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Linkage);
