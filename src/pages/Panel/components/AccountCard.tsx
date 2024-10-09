const AccountCard = ({
  socialBlade,
  handleSelectedAccount,
  account,
  isMobile,
}: any) => {
  return (
    <div
      onClick={() => handleSelectedAccount(socialBlade)}
      className={`text-white h-96 rounded-lg p-4 flex flex-col justify-around items-center text-center hover:bg-neutral-900 ${
        account?.id?.username === socialBlade?.id?.username
          ? "bg-neutral-900 shadow-xl"
          : "bg-neutral-700"
      } 
      ${isMobile ? "mb-4" : ""}
      cursor-pointer`}
    >
      <img
        src={socialBlade?.general?.branding?.avatar}
        alt=""
        className="w-32 h-32 shadow-lg object-cover rounded-full"
      />
      <div className="flex flex-col px-4 py-1">
        <h4 className="text-xl ">{socialBlade?.id?.display_name}</h4>
        <h4 className="text-xl font-bold">@{socialBlade?.id?.username}</h4>

        <div className="flex flex-col  w-full my-3">
          <span className="font-semibold">Followers</span>
          <span className="text-yellow-400 font-bold text-3xl items-center justify-center">
            {socialBlade.statistics?.total?.followers.toLocaleString("pt-BR")}
          </span>
        </div>
      </div>
    </div>
  );
};
export default AccountCard;
