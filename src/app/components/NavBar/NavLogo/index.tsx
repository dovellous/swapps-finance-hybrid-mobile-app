import { LogoWrapper, LogoTitle, LogoDescription } from './NavLogo';

export function NavLogo() {
  return (
    <LogoWrapper>
      <LogoTitle>
        <img src="/logo.png" alt="SwappyFinance" width="64"  />
      </LogoTitle>
      <LogoDescription>
        <LogoTitle>Swapps Finance</LogoTitle>
      </LogoDescription>
    </LogoWrapper>
  );
}
