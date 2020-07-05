export const createAction = (
  actionType: T.ActionType,
  shape: T.Shape,
): T.Action => {
  return {
    t: actionType,
    s: shape,
  };
};
