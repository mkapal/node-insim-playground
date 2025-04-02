import type { IS_BTC, IS_BTN_Data, IS_BTT } from "node-insim/packets";
import { ButtonFunction, IS_BTN, PacketType } from "node-insim/packets";
import type { InSim, InSimPacketEvents } from "node-insim/protocols";

let clickId = 0;

export type ButtonData = Omit<IS_BTN_Data, "ClickID"> & CustomButtonProps;

export type DrawButtonConfig = {
  clickId: number;
  update: (buttonData: ButtonData) => void;
};

export type OnClickProps = {
  packet: IS_BTC;
  inSim: InSim;
  button: DrawButtonConfig;
};

export type OnTypeProps = {
  packet: IS_BTT;
  inSim: InSim;
  button: DrawButtonConfig;
};

export type CustomButtonProps = {
  onClick?: (props: OnClickProps) => void;
  onType?: (props: OnTypeProps) => void;
};

let buttonClickListeners: InSimPacketEvents[PacketType.ISP_BTC][] = [];
let buttonTypeListeners: InSimPacketEvents[PacketType.ISP_BTT][] = [];

export function drawButton(
  inSim: InSim,
  { onClick, onType, ...buttonData }: ButtonData,
): DrawButtonConfig {
  const nextClickId = getNextClickId();
  const button = new IS_BTN({
    ...buttonData,
    ClickID: nextClickId,
    UCID: 255,
  });

  const update = ({ onClick, onType, ...newData }: ButtonData) => {
    if (onClick) {
      const onClickListener = (packet: IS_BTC, inSim: InSim) => {
        if (button.ClickID === packet.ClickID) {
          onClick({
            packet,
            inSim,
            button: {
              clickId: button.ClickID,
              update,
            },
          });
        }
      };
      inSim.on(PacketType.ISP_BTC, onClickListener);
      buttonClickListeners.push(onClickListener);
    }

    if (onType) {
      const onTypeListener = (packet: IS_BTT, inSim: InSim) => {
        if (button.ClickID === packet.ClickID) {
          onType({
            packet,
            inSim,
            button: {
              clickId: button.ClickID,
              update,
            },
          });
        }
      };
      inSim.on(PacketType.ISP_BTT, onTypeListener);
      buttonTypeListeners.push(onTypeListener);
    }
    const newButton = new IS_BTN({
      ...newData,
      ClickID: button.ClickID,
      UCID: 255,
    });

    inSim.send(newButton);
  };

  if (onClick) {
    const onClickListener = (packet: IS_BTC, inSim: InSim) => {
      if (button.ClickID === packet.ClickID) {
        onClick({
          packet,
          inSim,
          button: {
            clickId: button.ClickID,
            update,
          },
        });
      }
    };
    inSim.on(PacketType.ISP_BTC, onClickListener);
    buttonClickListeners.push(onClickListener);
  }

  if (onType) {
    const onTypeListener = (packet: IS_BTT, inSim: InSim) => {
      if (button.ClickID === packet.ClickID) {
        onType({
          packet,
          inSim,
          button: {
            clickId: button.ClickID,
            update,
          },
        });
      }
    };
    inSim.on(PacketType.ISP_BTT, onTypeListener);
    buttonTypeListeners.push(onTypeListener);
  }

  inSim.send(button);

  // Remove all click and type listeners when the all buttons are cleared by user
  inSim.on(PacketType.ISP_BFN, (packet) => {
    if (packet.SubT === ButtonFunction.BFN_USER_CLEAR) {
      buttonClickListeners.forEach((listener) => {
        inSim.removeListener(PacketType.ISP_BTC, listener);
      });
      buttonTypeListeners.forEach((listener) => {
        inSim.removeListener(PacketType.ISP_BTT, listener);
      });
      buttonClickListeners = [];
      buttonTypeListeners = [];
    }
  });

  return {
    clickId: button.ClickID,
    update,
  };
}

function getNextClickId() {
  return clickId === IS_BTN.MAX_CLICK_ID ? (clickId = 0) : ++clickId;
}
