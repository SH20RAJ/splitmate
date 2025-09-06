import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "../../../stack";

export const runtime = 'edge';

export default function Handler(props: unknown) {
  return <StackHandler fullPage app={stackServerApp} routeProps={props} />;
}
