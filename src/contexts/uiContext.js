import React from 'react';
import {Platform, ActionSheetIOS} from 'react-native';
import AndroidModal from '../components/ActionSheetModal/AndroidModal';

const UiContext = React.createContext(null);

export function UiContextProvider({children}) {
  const [actionModalData, setActionModal] = React.useState(null);
  const modal = {
    open: _actionModalData => {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [..._actionModalData.map(({text}) => text), '취소'],
          cancelButtonIndex: _actionModalData.length,
        },
        buttonIndex => {
          if (_actionModalData && _actionModalData[buttonIndex]?.onPress) {
            _actionModalData[buttonIndex].onPress();
          }
        },
      );
      setActionModal(_actionModalData);
    },
    close: () => {
      setActionModal(null);
    },
  };

  const uiComponents = React.useMemo(() => {
    const handleCloseActionModal = () => setActionModal(null);
    return (
      <>
        {Platform.OS === 'android' && (
          <AndroidModal
            visible={!!actionModalData}
            onClose={handleCloseActionModal}
            actions={actionModalData}
          />
        )}
        {children}
      </>
    );
  }, [actionModalData, children]);

  return <UiContext.Provider children={uiComponents} value={{modal}} />;
}

export function useUiContext() {
  const uiContext = React.useContext(UiContext);
  if (!uiContext) {
    throw new Error('uiContext.Provider is not found');
  }
  return uiContext;
}
