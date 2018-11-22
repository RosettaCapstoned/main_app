import * as React from 'react';
import { Media } from '../Definitions';
interface ProviderDispatchProps {
    connect?: () => void;
    disconnect?: () => void;
    removeAllMedia?: () => void;
}
interface ProviderStateProps {
    connectionState?: string;
    isSupportedBrowser?: boolean;
    localMedia?: Media[];
}
export interface ProviderProps extends ProviderStateProps, ProviderDispatchProps {
    configUrl: string;
    userData?: string;
    render?: (props: ProviderStateProps) => React.ReactNode;
    children?: React.ReactNode | ((props: ProviderStateProps) => React.ReactNode);
}
/**
 * @description
 *
 * @public
 *
 */
declare class Provider extends React.Component<ProviderProps, any> {
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): {} | null | undefined;
}
/**
 * @description
 *
 * @public
 * @example
 * <NotSupported>
 *   <p>This browser does not support WebRTC media features.</p>
 * </NotSupported>
 */
export declare const NotSupported: import("react-redux").ConnectedComponentClass<{
    new (props: Readonly<ProviderStateProps>): {
        render(): {} | null | undefined;
        setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<ProviderStateProps>;
        state: Readonly<any>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: ProviderStateProps, context?: any): {
        render(): {} | null | undefined;
        setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<ProviderStateProps>;
        state: Readonly<any>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
}, Pick<ProviderStateProps, never> & ProviderProps>;
/**
 * @description
 *
 * @public
 * @example
 * <NotConnected>
 *   <p>The client is not connected. It might be connecting or disconnected.</p>
 * </NotConnected>
 */
export declare const NotConnected: import("react-redux").ConnectedComponentClass<{
    new (props: Readonly<ProviderProps>): {
        render(): {} | null | undefined;
        setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<ProviderProps>;
        state: Readonly<any>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: ProviderProps, context?: any): {
        render(): {} | null | undefined;
        setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<ProviderProps>;
        state: Readonly<any>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
}, Pick<ProviderProps, "children" | "render" | "configUrl" | "userData"> & ProviderProps>;
/**
 * @description
 * The `<Connected />` component renders its children when the SimpleWebRTC client is connected and ready.
 * @public
 * @example
 * <Connecting>
 *   <p>The client is connecting and not yet ready.</p>
 * </Connecting>
 */
export declare const Connecting: import("react-redux").ConnectedComponentClass<{
    new (props: Readonly<ProviderProps>): {
        render(): {} | null | undefined;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<ProviderProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<ProviderProps>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: ProviderProps, context?: any): {
        render(): {} | null | undefined;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<ProviderProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<ProviderProps>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
}, Pick<ProviderProps, "disconnect" | "connect" | "children" | "render" | "configUrl" | "userData" | "removeAllMedia">>;
/**
 * @description
 * The `<Connecting />` component renders its children when the SimpleWebRTC client is starting and attempting to connect to the service.
 * @public
 * @example
 * <Connected>
 *   <p>The client is now ready.</p>
 * </Connected>
 */
export declare const Connected: import("react-redux").ConnectedComponentClass<{
    new (props: Readonly<ProviderProps>): {
        render(): {} | null | undefined;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<ProviderProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<ProviderProps>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: ProviderProps, context?: any): {
        render(): {} | null | undefined;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<ProviderProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<ProviderProps>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
}, Pick<ProviderProps, "disconnect" | "connect" | "children" | "render" | "configUrl" | "userData" | "removeAllMedia">>;
/**
 * @description
 * The `<Disconnected />` component renders its children when the SimpleWebRTC client has lost connection with the service.
 * @public
 * @example
 * <Disconnected>
 *   <p>The client lost access to the signaling service.</p>
 * </Disconnected>
 */
export declare const Disconnected: import("react-redux").ConnectedComponentClass<{
    new (props: Readonly<ProviderProps>): {
        render(): {} | null | undefined;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<ProviderProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<ProviderProps>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: ProviderProps, context?: any): {
        render(): {} | null | undefined;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<ProviderProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<ProviderProps>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
}, Pick<ProviderProps, "disconnect" | "connect" | "children" | "render" | "configUrl" | "userData" | "removeAllMedia">>;
/**
 * @description
 * The `<Failed />` component renders its children when the SimpleWebRTC client failed to receive its service configuration and can not continue.
 * @public
 * @example
 * <Failed>
 *   <p>There was an error initializing the client. The service might not be available.</p>
 * </Failed>
 */
export declare const Failed: import("react-redux").ConnectedComponentClass<{
    new (props: Readonly<ProviderProps>): {
        render(): {} | null | undefined;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<ProviderProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<ProviderProps>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: ProviderProps, context?: any): {
        render(): {} | null | undefined;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<ProviderProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<ProviderProps>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
}, Pick<ProviderProps, "disconnect" | "connect" | "children" | "render" | "configUrl" | "userData" | "removeAllMedia">>;
declare const _default: import("react-redux").ConnectedComponentClass<typeof Provider, Pick<ProviderProps, "children" | "render" | "configUrl" | "userData"> & ProviderProps>;
export default _default;
