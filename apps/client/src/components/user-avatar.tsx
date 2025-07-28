import { getInitials } from "@reactive-resume/utils";

import { useUser } from "../services/user";

type Props = {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

export const UserAvatar = ({ size = 36, className, style }: Props) => {
  const { user } = useUser();

  if (!user) return null;

  let picture: React.ReactNode;

  if (user.picture) {
    picture = (
      <img
        alt=""
        src={user.picture}
        className="rounded-full"
        style={{ width: size, height: size }}
      />
    );
  } else {
    const initials = getInitials(user.name);
    const third = size / 3;

    picture = (
      <div
        style={{ width: size, height: size }}
        className="grid grid-cols-1 content-center rounded-full bg-primary"
      >
        <p
          style={{ fontSize: `${third}px` }}
          className="size-fit w-full text-center font-semibold leading-none text-white"
        >
          {initials}
        </p>
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      {picture}
    </div>
  );
};
